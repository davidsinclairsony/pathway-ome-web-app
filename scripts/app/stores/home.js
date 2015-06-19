import {assign, events} from '../../libs';
import Dispatcher from '../dispatcher';
import Constants from '../constants';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'home',
		showMenu: false
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
	initialize: function() {
		// Set defaults
		storage = defaults();
		save();
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	toggleShowMenu: function() {
		save(storage, 'showMenu', !storage.showMenu);
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.HOME_TOGGLE_SHOW_MENU:
			Store.toggleShowMenu();
			Store.emitChange();
			break;
	}
});

export default Store;