import Actions from '../actions';
import assign from 'object-assign';
import Authenticator from '../utilities/authenticator';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';
//import Help from '../data/help';
import router from '../router';
//import Validator from '../utilities/validator';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'create',
		agreedToConsent: false,
		message: undefined,
		showConsent: false,
		showMessage: false,
		isWaiting: false
	};
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	changeAgreedToConsent: function(value) {
		storage.agreedToConsent = value;
	},
	changeIsWaiting: function(value) {
		storage.isWaiting = value;
	},
	changeShowConsent: function(value) {
		storage.showConsent = value;
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
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	submit: function(fields) {
		storage.isWaiting = true;

		let data = {
			firstName: fields.name.values[0],
			lastName: fields.name.values[1],
			email: fields.email.values[0],
			dateOfBirth: fields.dob.values[0] + '/' + fields.dob.values[1] + '/' +
				fields.dob.values[2],
			password: fields.doublePassword.values[0]
		};

		Authenticator.create(data, this.submitHandler);
	},
	submitHandler: function(response) {
		if(
			response.status &&
			(response.status !== 200 || response.status !== 204)
		) {
			storage.isWaiting = false;
			Actions.Create.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		} else {
			router.transitionTo('activate');
		}
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.CREATE_CHANGE_AGREED_TO_CONSENT:
			Store.changeAgreedToConsent(action.value);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_CHANGE_IS_WAITING:
			Store.changeIsWaiting(action.value);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_CHANGE_SHOW_CONSENT:
			Store.changeShowConsent(action.value);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_CHANGE_SHOW_MESSAGE:
			Store.changeShowMessage(action.value, action.message);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_SUBMIT:
			Store.submit(action.fields);
			Store.emitChange();
			break;
	}
});

export default Store;