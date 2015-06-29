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
		agreedToConsent: false,
		showConsent: false
	};
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
	initialize: function() {
		storage = defaults();
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	toggleAgreedToConsent: function() {
		storage.agreedToConsent = !storage.agreedToConsent;
	},
	toggleShowConsent: function() {
		storage.showConsent = !storage.showConsent;
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.CREATE_TOGGLE_AGREED_TO_CONSENT:
			Store.toggleAgreedToConsent();
			Store.emitChange();
			break;
		case Constants.Actions.CREATE_TOGGLE_SHOW_CONSENT:
			Store.toggleShowConsent();
			Store.emitChange();
			break;
	}
});

export default Store;