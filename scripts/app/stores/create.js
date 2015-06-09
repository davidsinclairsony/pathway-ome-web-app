import {assign, React} from '../../libs';
import router from '../router';
import Dispatcher from '../dispatcher';
import Constants from '../constants';
import Validator from '../utilities/validator';
import Help from '../data/help';
import Authenticator from '../utilities/authenticator';
import BaseStore from './base';

let defaults = () => {return {
	name: 'create',
	isWaiting: false,
	fields: {
		email: {
			isValid: undefined,
			showHelp: false,
			help: undefined,
			value: undefined
		},
		password: {
			isValid: undefined,
			showHelp: false,
			help: undefined,
			value: undefined
		},
		repeatPassword: {
			isValid: undefined,
			showHelp: false,
			help: undefined,
			value: undefined
		}
	}
};};
let save = function(object, key, value) {
	// Save within storage
	if(object) {
		object[key] = value;
	}

	// Persist to local storage
	localStorage[storage.name] = JSON.stringify(storage);
};
let storage;

let Store = assign({}, BaseStore, {
	get: function(keys) {
		let value = storage;

		for(let key in keys) {
			value = value[keys[key]];
		}

		return value;
	},
	hideAllHelp: function() {
		for(let f in storage.fields) {
			if(storage.fields.hasOwnProperty(f)) {
				storage.fields[f].showHelp = false;
			}
		}
	},
	initialize: function() {
		// Set defaults
		storage = defaults();

		// Save any data from local storage
		if(localStorage[storage.name]) {
			// Get old data
			let data = JSON.parse(localStorage[storage.name]);

			// Save some previous data from local storage
			save(storage.fields, 'email', data.fields.email);
		} else {
			save();
		}
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
			case 'password':
				// Set validation result
				save(fieldObject, 'isValid', Validator.isPasswordValid(value));

				// If invalid, set correct help
				if(!fieldObject.isValid) {
					save(fieldObject, 'help', Help.invalidPassword);
				}

				// Validate the repeat password field
				this.onFieldChange('repeatPassword',
					storage.fields.repeatPassword.value
				);

				break;
			case 'repeatPassword':
				// Validate the password and compare to repeated password
				save(
					fieldObject, 'isValid',
					Validator.isPasswordValid(storage.fields.password.value) &&
						storage.fields.password.value === value
				);

				// If invalid, set correct help
				if(!fieldObject.isValid) {
					save(fieldObject, 'help', Help.invalidRepeatPassword);
				}

				break;
		}

		// Hide help if it was showing and the field is now valid
		if(fieldObject.isValid) {
			save(fieldObject, 'shouldShowHelp', false);
		}
	},
	setHelp: function(field, help) {
		save(storage.fields[field].help, help);
	},
	submit: function() {
		// Show waiting
		save(storage, 'isWaiting', true);

		// Gather data
		let data = {
			email: storage.fields.email.value,
			password: storage.fields.password.value,
			passwordConfirmation: storage.fields.repeatPassword.value
		};

		// Pew pew pew
		Authenticator.create(data).catch(function(error) {
			console.log("Error logging in", error);
		});
	},
	success: function() {
		// Trigger navigation to activate
		router.transitionTo('activate');

		// Create new login storage object
		let loginStorage = {
			email: storage.fields.email.value
		};

		// Save email to local storage
		localStorage.login = JSON.stringify(loginStorage);
	},
	toggleShowHelp: function(field) {
		// Save current state
		let showHelp = storage.fields[field].showHelp;

		// Hide any previous help
		this.hideAllHelp();

		// Save new state
		save(storage.fields[field], '/showHelp', !showHelp);
	},
	validateAll: function() {
		for(let field in storage.fields) {
			if(storage.fields.hasOwnProperty(field)) {
				this.onFieldChange(field, storage.fields[field].value);
			}
		}
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.CREATE_SET_HELP:
			Store.setHelp(action.field, action.help);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_HIDE_ALL_HELP:
			Store.hideAllHelp();
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_ON_FIELD_CHANGE:
			Store.onFieldChange(action.field, action.value);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_SUBMIT:
			Store.submit();
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_SUCCESS:
			Store.success();
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_TOGGLE_SHOW_HELP:
			Store.toggleShowHelp(action.field);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_VALIDATE_ALL:
			Store.validateAll();
			Store.emitChange();
			break;
	}
});

export default Store;