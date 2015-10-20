import assign from 'object-assign';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';
import Help from '../data/help';
import User from '../utilities/user';
import Validator from '../utilities/validator';
import Immutable from 'seamless-immutable';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'fields',
		fields: Immutable({}),
		isWaiting: false
	};
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	changeShowHelp: function(o) {
		let mutableFields = storage.fields.asMutable({deep: true});

		Object.keys(mutableFields).forEach(field => {
			mutableFields[field].showHelp = false;
		});

		mutableFields[o.field].showHelp = o.value;

		storage.fields = Immutable(mutableFields);
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	fill: function(data) {
		let mutableFields = storage.fields.asMutable({deep: true});

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
				switch(v) {
					case 'firstName':
						mutableFields.name.values[0] = data[v];
						break;
					case 'lastName':
						mutableFields.name.values[1] = data[v];
						break;
					case 'dateOfBirth':
						let dob = data[v].split('/');

						dob.map((o, i) => {
							mutableFields.dob.values[i] = dob[i];
						});
						break;
					default:
						mutableFields[getMappedRecord(v)].values[0] = data[v];
				}
			}
		});

		storage.fields = Immutable(mutableFields);
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

			let mutableFields = storage.fields.asMutable({deep: true});

			mutableFields[field] = assign({}, defaults, custom);

			storage.fields = Immutable(mutableFields);
		});
	},
	onEmailBlur: function() {
		if(storage.fields.email.isValid) {
			User.doesEmailExist(
				{email: storage.fields.email.values[0]},
				response => {this.onEmailBlurHandler(response);}
			);
		}
	},
	onEmailBlurHandler: function(response) {
		let mutableFields = storage.fields.asMutable({deep: true});

		if(response.status && response.status !== 200) {
			this.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		} else if(response.code == 'AlreadyExists') {
			mutableFields.email.help = Help.emailExists;
			mutableFields.email.isValid = false;
		}

		storage.fields = Immutable(mutableFields);

		this.emitChange();
	},
	onFieldChange: function(o) {
		let mutableFields = storage.fields.asMutable({deep: true});

		// Make sure previous array values already exist
		for(let i = 0; i < o.vIndex; i++) {
			if(
				!mutableFields[o.name].values[i] &&
				mutableFields[o.name].values[i] !== ''
			) {
				mutableFields[o.name].values.push('');
			}
		}

		// Save value
		mutableFields[o.name].values[o.vIndex] = o.value;

		// Validate
		mutableFields[o.name].isValid =
			Validator.validate(mutableFields[o.name]);

		// Set help
		if(mutableFields[o.name].isValid === false) {
			mutableFields[o.name].help = Help[o.name];
		}

		storage.fields = Immutable(mutableFields);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	resetValidation: function() {
		let mutableFields = storage.fields.asMutable({deep: true});

		Object.keys(mutableFields).forEach(field => {
			mutableFields[field].isValid = undefined;
		});

		storage.fields = Immutable(mutableFields);
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
		case Constants.Actions.FIELDS_ON_EMAIL_BLUR:
			Store.onEmailBlur();
			Store.emitChange();
			break;
		case Constants.Actions.FIELDS_ON_FIELD_CHANGE:
			Store.onFieldChange(action.description);
			Store.emitChange();
			break;
		case Constants.Actions.FIELDS_RESET_VALIDATION:
			Store.resetValidation();
			Store.emitChange();
			break;
	}
});

export default Store;