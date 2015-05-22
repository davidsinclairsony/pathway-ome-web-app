var Dispatcher = require('./dispatcher');
var Constants = require('./constants');

var Actions = {
	toggleExpandLogin: function() {Dispatcher.dispatch({
		actionType: Constants.TOGGLE_EXPAND_LOGIN
	});},
	toggleExpandRegister: function() {Dispatcher.dispatch({
		actionType: Constants.TOGGLE_EXPAND_REGISTER
	});},
	submitLogin: function() {

	},
	showPasswordReset: function() {

	},
	submitRegister: function() {

	},
	showVerification: function() {

	}
};

module.exports = Actions;