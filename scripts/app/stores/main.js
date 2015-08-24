import assign from 'object-assign';
import Dispatcher from '../dispatcher';
import events from 'events';

let CHANGE_EVENT = 'change';

// Create store
let Store = assign({}, events.EventEmitter.prototype, {
	isPreviousUser: function() {
		return false;
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

	}
});

export default Store;