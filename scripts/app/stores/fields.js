//import Actions from '../actions';
import assign from 'object-assign';
//import User from '../utilities/user';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';
import Help from '../data/help';
//import router from '../router';
import Validator from '../utilities/validator';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'fields',
		fields: {},
		isWaiting: false
	};
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	changeShowHelp: function(o) {
		Object.keys(storage.fields).forEach(field => {
			storage.fields[field].showHelp = false;
		});

		storage.fields[o.field].showHelp = o.value;
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	fill: function(data) {
		let apiToStoreHciMap = {
			nutritionalGoal: 'nutritionGoal',
			activityRating: 'activityLevel',
			pgDietType: 'dietType',
			hasDiabetes: 'diabetic',
			hasHighCholesterol: 'highCholesterol',
			foodAllergyList: 'allergies',
			dietPrefs: 'diet'
		};
		let getMappedRecord = apiRecord => {
			if(apiToStoreHciMap[apiRecord]) {
				return apiToStoreHciMap[apiRecord];
			}

			return apiRecord;
		};

		Object.keys(data).forEach(v => {
			if(typeof(data[v]) !== 'undefined') {
				storage.fields[getMappedRecord(v)].values[0] = data[v];
			}
		});

		//this.emitChange();
	},
	get: function(keys) {
		let value = storage;

		for(let key in keys) {
			value = value[keys[key]];
		}

		return value;
	},
	initialize: function(fields) {
		storage = defaults();

		// Create fields object in storage
		fields.forEach(field => {
			let defaults = {
				name: field,
				values: [],
				isValid: undefined,
				help: undefined,
				showHelp: false,
				required: true,
				showIcon: false
			};
			let custom = {};

			switch(field) {
				case 'newPassword':
				case 'securityQuestion':
				case 'securityAnswer':
				case 'diabetic':
				case 'highCholesterol':
				case 'allergies':
				case 'diet':
				case 'highCholesterol':
					custom.required = false;
					break;
			}

			storage.fields[field] = assign({}, defaults, custom);
		});
	},
	onFieldChange: function(o) {
		// Make sure previous array values already exist
		for(let i = 0; i < o.vIndex; i++) {
			if(
				!storage.fields[o.name].values[i] &&
				storage.fields[o.name].values[i] !== ''
			) {
				storage.fields[o.name].values.push('');
			}
		}

		// Save value
		storage.fields[o.name].values[o.vIndex] = o.value;

		// Validate
		storage.fields[o.name].isValid =
			Validator.validate(storage.fields[o.name]);

		// Set help
		if(storage.fields[o.name].isValid === false) {
			storage.fields[o.name].help = Help[o.name];
		}
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.FIELDS_CHANGE_SHOW_HELP:
			Store.changeShowHelp(action.object);
			Store.emitChange();
			break;
		case Constants.Actions.FIELDS_FILL:
			Store.fill(action.data);
			Store.emitChange();
			break;
		case Constants.Actions.FIELDS_ON_FIELD_CHANGE:
			Store.onFieldChange(action.description);
			Store.emitChange();
			break;
	}
});

export default Store;