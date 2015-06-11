import Dispatcher from './dispatcher';
import Constants from './constants';

let Login = {
	hideAllHelp: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_HIDE_ALL_HELP
		});
	},
	onFieldChange: (field, value) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_ON_FIELD_CHANGE,
			field,
			value
		});
	},
	responseHandler: response => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_RESPONSE_HANDLER,
			response
		});
	},
	submit: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.LOGIN_SUBMIT});
	},
	toggleShowHelp: field => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_TOGGLE_SHOW_HELP,
			field
		});
	},
	toggleStayLoggedIn: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_TOGGLE_STAY_LOGGED_IN
		});
	},
	validateAll: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.LOGIN_VALIDATE_ALL});
	}
};

let Create = {
	hideAllHelp: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_HIDE_ALL_HELP
		});
	},
	onFieldChange: (field, value) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_ON_FIELD_CHANGE,
			field,
			value
		});
	},
	responseHandler: response => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_RESPONSE_HANDLER,
			response
		});
	},
	setHelp: (field, help) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_SET_HELP,
			field,
			help
		});
	},
	submit: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.CREATE_SUBMIT});
	},
	toggleShowHelp: field => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_TOGGLE_SHOW_HELP,
			field
		});
	},
	validateAll: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.CREATE_VALIDATE_ALL});
	}
};

let Activate = {
	hideAllHelp: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_HIDE_ALL_HELP
		});
	},
	onFieldChange: (field, value) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_ON_FIELD_CHANGE,
			field,
			value
		});
	},
	responseHandler: response => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_RESPONSE_HANDLER,
			response
		});
	},
	submit: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.ACTIVATE_SUBMIT});
	},
	toggleShowHelp: field => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_TOGGLE_SHOW_HELP,
			field
		});
	},
	validateAll: () => {
		Dispatcher.dispatch({actionType: Constants.ACTIVATE.LOGIN_VALIDATE_ALL});
	}
};

let Start = {
	toggleShowExpanded: (component) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_TOGGLE_SHOW_EXPANDED,
			component
		});
	}
};

export default {Login, Create, Activate, Start};