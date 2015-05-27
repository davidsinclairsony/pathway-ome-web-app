import Dispatcher from './dispatcher';
import Constants from './constants';

let Actions = {
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