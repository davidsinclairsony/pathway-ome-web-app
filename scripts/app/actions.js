import Dispatcher from './dispatcher';
import Constants from './constants';

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

let Create = {
	changeAgreedToConsent: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_CHANGE_AGREED_TO_CONSENT,
			value
		});
	},
	changeIsWaiting: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_CHANGE_IS_WAITING,
			value
		});
	},
	changeShowConsent: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_CHANGE_SHOW_CONSENT,
			value
		});
	}
};

let Details = {
	changeShowHelp: object => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.DETAILS_CHANGE_SHOW_HELP,
			object
		});
	},
	onFieldChange: description => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.DETAILS_ON_FIELD_CHANGE,
			description
		});
	}
};

let Home = {
	toggleShowMenu: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.HOME_TOGGLE_SHOW_MENU
		});
	}
};

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

export default {Activate, Create, Details, Home, Login};