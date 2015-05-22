var Dispatcher = require('./dispatcher');
var EventEmitter = require('../libs').events.EventEmitter;
var Constants = require('./constants');
var assign = require('../libs').assign;

var CHANGE_EVENT = 'change';

// Private functions
var isPreviousUser = function() {
	return false;
};
var toggleExpandRegister = function() {
	expandRegister = !expandRegister;
};
var toggleExpandLogin = function() {
	expandLogin = !expandLogin;
};

// Private values
var expandRegister = !isPreviousUser();
var expandLogin = isPreviousUser();

// Create store
var Store = assign({}, EventEmitter.prototype, {
	checkIfInStart: function() {
		return true;
	},
	expandRegister: function() {
		return expandRegister;
	},
	expandLogin: function() {
		return expandLogin;
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
		case Constants.TOGGLE_EXPAND_LOGIN:
			toggleExpandLogin();
			Store.emitChange();
			break;
		case Constants.TOGGLE_EXPAND_REGISTER:
			toggleExpandRegister();
			Store.emitChange();
			break;
	}
});

module.exports = Store;