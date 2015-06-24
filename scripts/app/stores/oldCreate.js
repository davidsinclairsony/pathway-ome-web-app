import {assign, events} from '../../libs';
import router from '../router';
import Dispatcher from '../dispatcher';
import Constants from '../constants';
import Validator from '../utilities/validator';
import Help from '../data/help';
import Authenticator from '../utilities/authenticator';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'create',
		isWaiting: false,
		fields: [
			'name', 'emails', 'password', 'repeatPassword', 'gender', 'dob', 'zip'
		]
	};
};
let save = function(object, key, value) {
	// Save within storage
	if(object) {
		object[key] = value;
	}

	// Persist to session storage
	sessionStorage[storage.name] = JSON.stringify(storage);
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
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
		for(let f in storage.fields) {
			if(storage.fields.hasOwnProperty(f)) {
				storage.fields[f].showHelp = false;
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
				// Create new login storage object
				let loginStorage = {
					fields: {
						email: {
							value: storage.fields.email.value
						}
					}
				};

				// Save email to local storage
				localStorage.login = JSON.stringify(loginStorage);

				// Trigger navigation to activate
				router.transitionTo('activate');

				break;
			// Account already exists
			case 409:
				// Make email field invalid and set help
				this.setHelp('email', Help.emailInUse);
				save(storage.fields.email, 'isValid', false);
				break;
			// An invalid email or password was sent
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
			email: storage.fields.email.value,
			password: storage.fields.password.value,
			passwordConfirmation: storage.fields.repeatPassword.value
		};

		// Pew pew pew
		Authenticator.create(data).catch(error => {
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
			storage.fields.password.isValid &&
			storage.fields.repeatPassword.isValid
		) {
			this.submit();
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
		case Constants.Actions.CREATE_RESPONSE_HANDLER:
			Store.responseHandler(action.response);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_SUBMIT:
			Store.submit();
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