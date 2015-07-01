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
		name: 'reactivate',
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
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.REACTIVATE_CHANGE_IS_WAITING:
			Store.changeIsWaiting(action.value);
			Store.emitChange();
			break;
	}
});

export default Store;