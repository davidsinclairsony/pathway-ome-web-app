import Dispatcher from './dispatcher';
import Constants from './constants';

let Login = {
	validateField: function(field, value) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_VALIDATE_FIELD,
			field: field,
			value: value
		});
	},
	toggleShowHelp: function(field) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_TOGGLE_SHOW_HELP,
			field: field
		});
	},
	setHelp: function(field, help) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_SET_HELP,
			field: field,
			field: help
		});
	},
	reset: function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_RESET
		});
	}
};

let Create = {
	validateField: function(field, value) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_VALIDATE_FIELD,
			field: field,
			value: value
		});
	},
	toggleShowHelp: function(field) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_TOGGLE_SHOW_HELP,
			field: field
		});
	},
	setHelp: function(field, help) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_SET_HELP,
			field: field,
			field: help
		});
	},
	reset: function() {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_RESET
		});
	}
};

export default {
	Login: Login,
	Create: Create
}