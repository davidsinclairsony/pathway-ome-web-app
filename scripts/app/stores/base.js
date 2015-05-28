import {assign, events} from '../../libs';
import Dispatcher from '../dispatcher';
import Constants from '../constants';

let CHANGE_EVENT = 'change';

// Private
let submitLogin = function() {
	console.log("submitted");
};

// Create store
let Store = assign({}, events.EventEmitter.prototype, {
	isPreviousUser: function() {
		return true;
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
		case Constants.SUBMIT_LOGIN:
			submitLogin();
			Store.emitChange();
			break;
	}
});

export default Store;