import {assign, events} from '../../libs';
import Dispatcher from '../dispatcher';
import Constants from '../constants';
import Validator from '../utilities/validator';
import Help from '../data/help';
import Authenticator from '../utilities/authenticator';
import Actions from '../actions';

let CHANGE_EVENT = 'change';

let Store = assign({}, events.EventEmitter.prototype, {
	defaults: {
		isWaiting: false,
		fields: {
			email: {
				isValid: undefined,
				shouldShowHelp: false,
				help: undefined,
				value: undefined
			},
			password: {
				isValid: undefined,
				shouldShowHelp: false,
				help: undefined,
				value: undefined
			},
			repeatPassword: {
				isValid: undefined,
				shouldShowHelp: false,
				help: undefined,
				value: undefined
			}
		}
	},
	initialize: function() {
		// Get defaults
		this.storage = this.defaults;

		// Save any data from local storage
		if(localStorage.create) {
			// Get old data
			let data = JSON.parse(localStorage.create);

			// Save some previous data
			this.save(this.storage.fields, 'email', data.fields.email);
		} else {
			this.save();
		}
	},
	isWaiting: function() {
		return this.storage.isWaiting;
	},
	save: function(object, key, value) {
		// Save within storage
		if(object) {
			object[key] = value;
		}

		// Persist to local storage
		localStorage.create = JSON.stringify(this.storage);
	},
	validateAll: function() {
		for(let field in this.storage.fields) {
			if(this.storage.fields.hasOwnProperty(field)) {
				this.validateField(field, this.storage.fields[field].value);
			}
		}
	},
	validateField: function(field, value) {
		let fieldObject = this.storage.fields[field];

		this.save(fieldObject, 'value', value);

		switch(field) {
			case 'email':
				this.save(fieldObject, 'isValid', Validator.isEmailValid(value));

				// If invalid, set correct help
				if(!fieldObject.isValid) {
					this.save(fieldObject, 'help', Help.invalidEmail);
				}

				break;
			case 'password':
				// Set validation result
				this.save(fieldObject, 'isValid', Validator.isPasswordValid(value));

				// If invalid, set correct help
				if(!fieldObject.isValid) {
					this.save(fieldObject, 'help', Help.invalidPassword);
				}

				// Validate the repeat password field
				this.validateField('repeatPassword',
					this.storage.fields.repeatPassword.value
				);

				break;
			case 'repeatPassword':
				// Validate the password and compare to repeated password
				this.save(
					fieldObject, 'isValid',
					Validator.isPasswordValid(this.storage.fields.password.value) &&
						this.storage.fields.password.value === value
				);

				// If invalid, set correct help
				if(!fieldObject.isValid) {
					this.save(fieldObject, 'help', Help.invalidRepeatPassword);
				}

				break;
		}

		if(fieldObject.isValid) {
			this.save(fieldObject, 'shouldShowHelp', false);
		}
	},
	isValid: function(field) {
		return this.storage.fields[field].isValid;
	},
	shouldShowHelp: function(field) {
		return this.storage.fields[field].shouldShowHelp;
	},
	toggleShowHelp: function(field) {
		// Save current state
		let shouldShowHelp = this.storage.fields[field].shouldShowHelp;

		// Disable all showing
		for(let f in this.storage.fields) {
			if(this.storage.fields.hasOwnProperty(f)) {
				this.storage.fields[f].shouldShowHelp = false;
			}
		}

		// Save new state
		this.save(this.storage.fields[field], 'shouldShowHelp', !shouldShowHelp);
	},
	getValue: function(field) {
		return this.storage.fields[field].value;
	},
	getHelp: function(field) {
		return this.storage.fields[field].help;
	},
	setHelp: function(field, help) {
		this.save(this.storage.fields[field].help, help);
	},
	submit: function() {
		// Show waiting
		this.save(this.storage, 'isWaiting', true);

		// Gather data
		let data = {
			email: this.storage.fields.email.value,
			password: this.storage.fields.password.value,
			passwordConfirmation: this.storage.fields.repeatPassword.value
		};

		// Pew pew pew
		Authenticator.create(data).catch(function(error) {
			console.log("Error logging in", err);
		});
	},
	success: function() {
		// Create new login storage object
		let loginStorage = {
			email: this.storage.fields.email.value
		};

		// Save email to local storage
		localStorage.login = JSON.stringify(loginStorage);

		// Reset storage
		this.storage = this.defaults;
		this.save();

		// Trigger navigation to verify
		console.log("navigate away to verify!");
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.CREATE_SET_HELP:
			Store.setHelp(action.field, action.help);
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
		case Constants.Actions.CREATE_VALIDATE_FIELD:
			Store.validateField(action.field, action.value);
			Store.emitChange();
			break;
	}
});

Store.initialize();

export default Store;