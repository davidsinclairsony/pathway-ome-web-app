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
		name: 'login',
		isWaiting: false,
		stayLoggedIn: true,
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
			}
		}
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
		for(let field in storage.fields) {
			if(storage.fields.hasOwnProperty(field)) {
				storage.fields[field].showHelp = false;
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
		}

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
				// Prepare authentication storage
				let authStorage = {jwt: response.auth};

				// Save JWT to local or session storage
				if(storage.stayLoggedIn) {
					localStorage.authentication = JSON.stringify(authStorage);
				} else {
					sessionStorage.authentication = JSON.stringify(authStorage);
				}

				// Save email to localStorage for future login use
				let loginLocalStorage = {
					name: 'login',
					fields: {
						email: {
							value: storage.fields.email.value
						}
					}
				};

				localStorage[storage.name] = JSON.stringify(loginLocalStorage);

				// Set sessionStorage defaults and save
				storage = defaults();
				save();

				// Trigger navigation to activate
				router.transitionTo('home');

				break;
			// Not a valid email
			case 400:
				this.setHelp('email', Help.incorrectEmail);
					save(storage.fields.email, 'isValid', false);
				break;
			// Either bad password or no account associated to email
			case 401:
				if(response.message == 'Invalid password') {
					this.setHelp('password', Help.incorrectPassword);
					save(storage.fields.password, 'isValid', false);
				} else {
					this.setHelp('email', Help.incorrectEmail);
					save(storage.fields.email, 'isValid', false);
				}

				break;
			// Too many login attempts
			case 403:
				console.log('Too mamany logins!');
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
			email: storage.fields.email.value,
			password: storage.fields.password.value,
			//expiration: storage.stayLoggedIn ? 20160 : undefined // 2 weeks
		};

		// Pew pew pew
		Authenticator.login(data).catch(error => {
			console.log(error);
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
	toggleStayLoggedIn: function() {
		save(storage, 'stayLoggedIn', !storage.stayLoggedIn);
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
		case Constants.Actions.LOGIN_HIDE_ALL_HELP:
			Store.hideAllHelp();
			Store.emitChange();
			break;
		case Constants.Actions.LOGIN_ON_FIELD_CHANGE:
			Store.onFieldChange(action.field, action.value);
			Store.emitChange();
			break;
		case Constants.Actions.LOGIN_RESPONSE_HANDLER:
			Store.responseHandler(action.response);
			Store.emitChange();
			break;
		case Constants.Actions.LOGIN_SUBMIT:
			Store.submit();
			Store.emitChange();
			break;
		case Constants.Actions.LOGIN_TOGGLE_SHOW_HELP:
			Store.toggleShowHelp(action.field);
			Store.emitChange();
			break;
		case Constants.Actions.LOGIN_TOGGLE_STAY_LOGGED_IN:
			Store.toggleStayLoggedIn();
			Store.emitChange();
			break;
		case Constants.Actions.LOGIN_VALIDATE_ALL:
			Store.validateAll();
			Store.emitChange();
			break;
	}
});

export default Store;