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
	goToStep: step => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_GO_TO_STEP,
			step
		});
	},
	setCurrentStep: step => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_SET_CURRENT_STEP,
			step
		});
	}
};

let Activate = {
	activate: (jwt) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_ACTIVATE,
			jwt
		});
	},
	activateHandler: response => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_ACTIVATE_HANDLER,
			response
		});
	},
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
		Dispatcher.dispatch({actionType: Constants.Actions.ACTIVATE_VALIDATE_ALL});
	}
};

let Home = {
	toggleShowMenu: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.HOME_TOGGLE_SHOW_MENU
		});
	}
};

export default {Login, Create, Activate, Home};