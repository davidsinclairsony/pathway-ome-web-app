var Dispatcher = require('./dispatcher');
var EventEmitter = require('../libs').events.EventEmitter;
var Constants = require('./constants');
var assign = require('../libs').assign;

var CHANGE_EVENT = 'change';

// Private
var submitLogin = function() {
	console.log("submitted");
};

// Create store
var Store = assign({}, EventEmitter.prototype, {
	checkIfInStart: function() {
		return true;
	},
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
	var text;

	switch(action.actionType) {
		case Constants.SUBMIT_LOGIN:
			submitLogin();
			Store.emitChange();
			break;
	}
});

module.exports = Store;