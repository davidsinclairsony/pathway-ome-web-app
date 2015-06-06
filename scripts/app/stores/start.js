import {assign} from '../../libs';
import Dispatcher from '../dispatcher';
import Constants from '../constants';
import Validator from '../utilities/validator';
import Actions from '../actions';
import BaseStore from './base';

// Private
let defaults = {
	name: 'start',
	createShowExpanded: true,
	createCollapsible: true,
	loginShowExpanded: true,
	loginCollapsible: true
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

let Store = assign({}, BaseStore, {
	get: function(keys) {
		let value = storage;

		for(let key in keys) {
			value = value[keys[key]];
		}

		return value;
	},
	initialize: function() {
		// Set defaults
		storage = defaults;

		// Save any data from local storage
		if(localStorage[storage.name]) {
			// Get old data
			let data = JSON.parse(localStorage[storage.name]);

			// Save some previous data from local storage
			save(storage, 'showExpanded', data.showExpanded);
		} else {
			save();
		}
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

Store.initialize();

export default Store;