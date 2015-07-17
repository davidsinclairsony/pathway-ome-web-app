import assign from 'object-assign';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'authentication',
		jwt: undefined
	};
};
let save = function(object, key, value) {
	// Save within storage
	if(object) {
		object[key] = value;
	}

	// Persist to local storage
	remoteStorage[storage.name] = JSON.stringify(storage);
};
let storage;
let remoteStorage;

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

		// Determine what type of storage is being used, if any
		if(localStorage.authentication) {
			remoteStorage = localStorage;
		} else {
			remoteStorage = sessionStorage;
		}

		// Save any old data
		if(remoteStorage.authentication) {
			let authStorage = JSON.parse(remoteStorage.authentication);

			// Check if user has a saved jwt
			if(authStorage.jwt) {
				save(storage, 'jwt', authStorage.jwt);
			}
		}

		save();
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {

	}
});

export default Store;