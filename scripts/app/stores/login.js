import Actions from '../actions';
import assign from 'object-assign';
import Authenticator from '../utilities/authenticator';
import {Buffer} from 'buffer';
import Constants from '../constants';
import crypto from 'crypto';
import Dispatcher from '../dispatcher';
import events from 'events';
import router from '../router';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'login',
		message: undefined,
		showMessage: false,
		isWaiting: false
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
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	submit: function(fields) {
		storage.isWaiting = true;

		let password;
		let salt = new Buffer(Constants.Security.PW_SALT).toString('base64');
		let data = {
			email: fields.email.values[0],
			password
		};

		crypto.pbkdf2(
			fields.singlePassword.values[0], salt, 1000, 128,
			(err, derivedKey) => {
				password = new Buffer(derivedKey);
				data.password = password.toString('base64');
				Authenticator.login(data, this.submitHandler);
			}
		);
	},
	submitHandler: function(response) {
		if(response.status && response.status !== 204) {
			storage.isWaiting = false;
			Actions.Login.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		} else {
			router.transitionTo('home');
		}
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.LOGIN_CHANGE_IS_WAITING:
			Store.changeIsWaiting(action.value);
			Store.emitChange();
			break;
		case Constants.Actions.LOGIN_CHANGE_SHOW_MESSAGE:
			Store.changeShowMessage(action.value, action.message);
			Store.emitChange();
			break;
		case Constants.Actions.LOGIN_SUBMIT:
			Store.submit(action.fields);
			Store.emitChange();
			break;
	}
});

export default Store;