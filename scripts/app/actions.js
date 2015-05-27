import Dispatcher from './dispatcher';
import Constants from './constants';

let Login = {
	submit: function() {Dispatcher.dispatch({
		actionType: Constants.SUBMIT_LOGIN
	});},
	showPasswordReset: function() {

	}
};

let Register = {
	submit: function() {

	},
	verification: function() {

	}
};

export {Login, Register}