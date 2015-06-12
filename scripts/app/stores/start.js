import {assign, events} from '../../libs';
import Dispatcher from '../dispatcher';
import Constants from '../constants';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'start',
		createShowExpanded: true,
		createCollapsible: true,
		loginShowExpanded: true,
		loginCollapsible: true
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

		// Get login data, otherwise hide login
		if(localStorage.login) {
			let loginStorage = JSON.parse(localStorage.login);

			// Check if user has a saved email from a previous account creation
			if(loginStorage.fields.email.value) {
				save(storage, 'createShowExpanded', false);
			} else {
				save(storage, 'loginShowExpanded', false);
			}
		} else {
			save(storage, 'loginShowExpanded', false);
		}

		save();
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	toggleShowExpanded: function(component) {
		switch(component) {
			case 'create':
				if(storage.createCollapsible) {
					save(storage, 'createShowExpanded', !storage.createShowExpanded);
				}
				break;
			case 'login':
				if(storage.loginCollapsible) {
					save(storage, 'loginShowExpanded', !storage.loginShowExpanded);
				}
				break;
		}
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.START_TOGGLE_SHOW_EXPANDED:
			Store.toggleShowExpanded(action.component);
			Store.emitChange();
			break;
	}
});

export default Store;