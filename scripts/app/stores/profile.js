import Actions from '../actions';
import assign from 'object-assign';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';
import User from '../utilities/user';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'profile',
		message: undefined,
		showMessage: false,
		isWaiting: true,
		showForm: false
	};
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	changeIsWaiting: function(value) {
		storage.isWaiting = value;
	},
	changeShowMessage: function(value, message) {
		storage.showMessage = value;

		if(message) {
			storage.message = message;
		}
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	get: function(keys) {
		let value = storage;

		for(let key in keys) {
			value = value[keys[key]];
		}

		return value;
	},
	initialize: function() {
		storage = defaults();
		User.fetchProfile(reponse => {this.initializeHandler(reponse);});
	},
	initializeHandler: function(response) {
		if(response.status && response.status !== 200) {
			this.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		}

		storage.showForm = true;
		storage.isWaiting = false;
		this.emitChange();
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	submit: function(fields) {
		storage.isWaiting = true;
		storage.showForm = false;

		let pii = {
			firstName: fields.name.values[0],
			lastName: fields.name.values[1],
			email: fields.email.values[0],
			dateOfBirth: fields.dob.values[0] + '/' + fields.dob.values[1] + '/' +
				fields.dob.values[2]
		};

		// Security question may not be changed and not have a value
		if(fields.securityQuestion.values[0]) {
			pii.securityQuestion = fields.securityQuestion.values[0];
		}

		// Security answer may not be changed and not have a value
		if(fields.securityAnswer.values[0]) {
			pii.securityAnswer = fields.securityAnswer.values[0];
		}

		// Password may not be changed and not have a value
		if(fields.newPassword.values[0]) {
			pii.password = User.passwordHasher(fields.newPassword.values[0]);
		}

		let hci = {
			gender: fields.gender.values[0],
			height: fields.height.values[0],
			weight: fields.weight.values[0],
			nutritionalGoal: fields.nutritionGoal.values[0],
			activityRating: fields.activityLevel.values[0],
			pgDietType: fields.dietType.values[0],
			hasDiabetes: fields.diabetic.values[0],
			hasHighCholesterol: fields.highCholesterol.values[0],
			foodAllergyList: fields.allergies.values[0],
			dietPrefs: fields.diet.values[0]
		};

		User.update(pii, hci, response => {this.submitHandler(response);});
	},
	submitHandler: function(response) {
		if(response.status && response.status !== 204) {
			storage.isWaiting = false;
			Actions.Profile.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		}

		Actions.Fields.resetValidation();
		storage.isWaiting = false;
		storage.showForm = true;
		this.emitChange();
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.PROFILE_CHANGE_IS_WAITING:
			Store.changeIsWaiting(action.value);
			Store.emitChange();
			break;
		case Constants.Actions.PROFILE_CHANGE_SHOW_MESSAGE:
			Store.changeShowMessage(action.value, action.message);
			Store.emitChange();
			break;
		case Constants.Actions.PROFILE_CLOSE:
			Store.close();
			Store.emitChange();
			break;
		case Constants.Actions.PROFILE_SUBMIT:
			Store.submit(action.fields);
			Store.emitChange();
			break;
	}
});

export default Store;