import {assign, events} from '../../libs';
import Dispatcher from '../dispatcher';
import Constants from '../constants';
import Validator from '../utilities/validator';
import Help from '../data/help';
import Authenticator from '../utilities/authenticator';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'activate',
		isActivated: false,
		isActivating: false,
		isWaiting: false,
		fields: {
			email: {
				isValid: undefined,
				showHelp: false,
				help: undefined,
				value: undefined
			}
		}
	};
};
let save = function(object, key, value) {
	// Save within storage
	if(object) {
		object[key] = value;
	}

	// Persist to local storage
	localStorage[storage.name] = JSON.stringify(storage);
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	activate: function(jwt) {
		// Store new states
		save(storage, 'hasJWT', true);
		save(storage, 'isActivating', true);

		// Pew pew pew
		Authenticator.activate(jwt).catch(error => {
			this.responseHandler(JSON.parse(error.response));
			this.emitChange();
		});
	},
	activateHandler: function(response) {
		switch(response.statusCode) {
			// Success
			case 200:
				save(storage, 'isActivated', true);
				save(storage, 'isActivating', false);
				break;
			// Not a valid jwt or failed
			default:
				save(storage, 'isActivated', false);
				save(storage, 'isActivating', false);
				break;
		}
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
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
	hideAllHelp: function() {
		for(let field in storage.fields) {
			if(storage.fields.hasOwnProperty(field)) {
				storage.fields[field].showHelp = false;
			}
		}
	},
	initialize: function() {
		// Set defaults
		storage = defaults();
		save();
	},
	onFieldChange: function(field, value) {
		let fieldObject = storage.fields[field];

		// Save field value
		save(fieldObject, 'value', value);

		// Validate
		switch(field) {
			case 'email':
				save(fieldObject, 'isValid', Validator.isEmailValid(value));

				// If invalid, set correct help
				if(!fieldObject.isValid) {
					save(fieldObject, 'help', Help.invalidEmail);
				}

				break;
		}

		// Hide help if it was showing and the field is now valid
		if(fieldObject.isValid) {
			save(fieldObject, 'showHelp', false);
		}
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	responseHandler: function(response) {
		let setAllFieldsInvalid = () => {
			for(let field in storage.fields) {
				if(storage.fields.hasOwnProperty(field)) {
					storage.fields[field].isValid = false;
				}
			}
		};

		switch(response.statusCode) {
			// Success
			case 200:
				// Show success message
				console.log('success');

				// Set defaults
				storage = defaults();
				save();

				break;
			// Not a valid email
			case 400:
				this.setHelp('email', Help.incorrectEmail);
					save(storage.fields.email, 'isValid', false);
				break;
			// No account associated to email
			case 401:
				this.setHelp('email', Help.incorrectEmail);
				save(storage.fields.email, 'isValid', false);
				break;
			// Trouble!
			default:
				setAllFieldsInvalid();
				break;
		}

		save(storage, 'isWaiting', false);
	},
	setHelp: function(field, help) {
		save(storage.fields[field], 'help', help);
	},
	submit: function() {
		// Show waiting
		save(storage, 'isWaiting', true);

		// Gather data
		let data = {
			email: storage.fields.email.value
		};

		// Pew pew pew
		Authenticator.getActivationLink(data).catch(error => {
			this.responseHandler(JSON.parse(error.response));
			this.emitChange();
		});
	},
	toggleShowHelp: function(field) {
		// Save current state
		let showHelp = storage.fields[field].showHelp;

		// Hide any previous help
		this.hideAllHelp();

		// Save new state
		save(storage.fields[field], 'showHelp', !showHelp);
	},
	validateAll: function() {
		for(let field in storage.fields) {
			if(storage.fields.hasOwnProperty(field)) {
				this.onFieldChange(field, storage.fields[field].value);
			}
		}

		if(
			storage.fields.email.isValid &&
			storage.fields.password.isValid
		) {
			this.submit();
		}
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.ACTIVATE_ACTIVATE:
			Store.activate(action.jwt);
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_ACTIVATE_HANDLER:
			Store.activateHandler(action.response);
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_HIDE_ALL_HELP:
			Store.hideAllHelp();
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_ON_FIELD_CHANGE:
			Store.onFieldChange(action.field, action.value);
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_RESPONSE_HANDLER:
			Store.responseHandler(action.response);
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_SUBMIT:
			Store.submit();
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_TOGGLE_SHOW_HELP:
			Store.toggleShowHelp(action.field);
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_VALIDATE_ALL:
			Store.validateAll();
			Store.emitChange();
			break;
	}
});

export default Store;