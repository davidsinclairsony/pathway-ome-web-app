import Dispatcher from './dispatcher';
import Constants from './constants';

let Login = {
	goToVerify:  function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_GO_TO_RESET_PASSWORD
		});
	},
	reset: function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_RESET
		});
	},
	setHelp: function(field, help) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_SET_HELP,
			field: field,
			field: help
		});
	},
	submit: function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_SUBMIT
		});
	},
	toggleShowHelp: function(field) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_TOGGLE_SHOW_HELP,
			field: field
		});
	},
	validateAll: function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_VALIDATE_ALL
		});
	},
	validateField: function(field, value) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_VALIDATE_FIELD,
			field: field,
			value: value
		});
	},
};

let Create = {
	goToVerify:  function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_GO_TO_VERIFY
		});
	},
	reset: function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_RESET
		});
	},
	setHelp: function(field, help) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_SET_HELP,
			field: field,
			field: help
		});
	},
	submit: function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_SUBMIT
		});
	},
	toggleShowHelp: function(field) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_TOGGLE_SHOW_HELP,
			field: field
		});
	},
	validateAll: function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_VALIDATE_ALL
		});
	},
	validateField: function(field, value) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_VALIDATE_FIELD,
			field: field,
			value: value
		});
	},
};

export default {
	Login: Login,
	Create: Create
}