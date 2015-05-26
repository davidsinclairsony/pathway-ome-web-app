var Dispatcher = require('./dispatcher');
var Constants = require('./constants');

var Actions = {
	submitLogin: function() {Dispatcher.dispatch({
		actionType: Constants.SUBMIT_LOGIN
	});},
	showPasswordReset: function() {

	},
	submitRegister: function() {

	},
	showVerification: function() {

	}
};

module.exports = Actions;