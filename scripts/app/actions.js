import Dispatcher from './dispatcher';
import Constants from './constants';

let Login = {
	goToVerify: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_GO_TO_RESET_PASSWORD
		});
	},
	reset: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.LOGIN_RESET});
	},
	setHelp: (field, help) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_SET_HELP,
			field: field,
			help: help
		});
	},
	submit: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_SUBMIT
		});
	},
	toggleShowHelp: field => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_TOGGLE_SHOW_HELP,
			field: field
		});
	},
	validateAll: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_VALIDATE_ALL
		});
	},
	validateField: (field, value) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_VALIDATE_FIELD,
			field: field,
			value: value
		});
	},
};

let Create = {
	goToVerify: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_GO_TO_VERIFY
		});
	},
	setHelp: (field, help) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_SET_HELP,
			field: field,
			help: help
		});
	},
	submit: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.CREATE_SUBMIT});
	},
	success: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.CREATE_SUCCESS});
	},
	toggleShowHelp: field => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_TOGGLE_SHOW_HELP,
			field: field
		});
	},
	validateAll: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.CREATE_VALIDATE_ALL});
	},
	validateField: (field, value) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_VALIDATE_FIELD,
			field: field,
			value: value
		});
	}
};

export default {Login, Create};