import assign from 'object-assign';
//import Constants from '../constants';
//import Dispatcher from '../dispatcher';
import events from 'events';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'window',
		width: undefined,
		height: undefined,
		bps: {
			1: 400,
			2: 600,
			3: 800,
			4: 1000,
			5: 1200,
			6: 1400
		}
	};
};
let save = function(object, key, value) {
	// Save within storage
	if(object) {
		object[key] = value;
	}

	// Persist to local storage
	sessionStorage[storage.name] = JSON.stringify(storage);
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
		window.addEventListener('resize', () => {
			this.updateDimensions();
			this.emitChange();
		});
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
		this.updateDimensions();
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
		window.removeEventListener('resize', () => {
			this.updateDimensions();
			this.emitChange();
		});
	},
	updateDimensions: function() {
		storage.width =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth;
		storage.height =
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight;
		save();
	}
});

export default Store;