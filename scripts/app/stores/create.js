import {assign, events} from '../../libs';
import Dispatcher from '../dispatcher';
import Constants from '../constants';
import Validator from '../utilities/validator';
import Help from '../data/help';

let CHANGE_EVENT = 'change';

// Create store
let Store = assign({}, events.EventEmitter.prototype, {

// convert all to local storage??!
	fields: {
		email: {
			isValid: undefined,
			shouldShowHelp: false,
			help: Help.invalidEmail
		},
		password: {
			isValid: undefined,
			shouldShowHelp: false,
			help: Help.invalidPassword
		},
		repeatPassword: {
			isValid: undefined,
			shouldShowHelp: false,
			help: Help.invalidRepeatPassword
		}
	},
	validateField: function(field, value) {
		let isValid;

		switch(field) {
			case 'email':
				this.fields[field].isValid = Validator.isEmailValid(value);
				this.fields[field].shouldShowHelp = false;
				break;
			case 'password':
				this.fields[field].isValid = Validator.isPasswordValid(value);
				break;
			case 'repeatPassword':
				this.fields[field].isValid =
					Validator.isPasswordValid(localStorage.password) &&
					localStorage.password === localStorage.repeatPassword
				;
				break;
		}

		// Save value to local storage if valid
		if(this.fields[field].isValid) {
			localStorage[field] = value;
		}
	},
	isValid: function(field) {
		return this.fields[field].isValid;
	},
	shouldShowHelp: function(field) {
		return this.fields[field].shouldShowHelp;
	},
	toggleShowHelp: function(field) {
		let shouldShowHelp = this.fields[field].shouldShowHelp;

		for(let field in this.fields) {
			if(this.fields.hasOwnProperty(field)) {
				this.fields[field].shouldShowHelp = false;
			}
		}

		this.fields[field].shouldShowHelp = !shouldShowHelp;
		localStorage.create[field].shouldShowHelp = !shouldShowHelp;
	},
	getHelp: function(field) {
		return this.fields[field].help;
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
		case Constants.Actions.CREATE_VALIDATE_FIELD:
			Store.validateField(action.field, action.value);
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_TOGGLE_SHOW_HELP:
			Store.toggleShowHelp(action.field);
			Store.emitChange();
			break;
	}
});

export default Store;