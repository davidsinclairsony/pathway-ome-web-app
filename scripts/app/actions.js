import Dispatcher from './dispatcher';
import Constants from './constants';

let Activate = {
	changeIsWaiting: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_CHANGE_IS_WAITING,
			value
		});
	},
	changeShowMessage: (value, message) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_CHANGE_SHOW_MESSAGE,
			value,
			message
		});
	},
	submit: fields => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.ACTIVATE_SUBMIT,
			fields
		});
	}
};

let Conversation = {
	changeIsWaiting: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_CHANGE_IS_WAITING,
			value
		});
	},
	changeShowMessage: (value, message) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_CHANGE_SHOW_MESSAGE,
			value,
			message
		});
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
	},
	changeShowMessage: (value, message) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_CHANGE_SHOW_MESSAGE,
			value,
			message
		});
	},
	submit: fields => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_SUBMIT,
			fields
		});
	}
};

let Fields = {
	changeShowHelp: object => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.FIELDS_CHANGE_SHOW_HELP,
			object
		});
	},
	fill: data => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.FIELDS_FILL,
			data
		});
	},
	onFieldChange: description => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.FIELDS_ON_FIELD_CHANGE,
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
	changeIsWaiting: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_CHANGE_IS_WAITING,
			value
		});
	},
	changeShowMessage: (value, message) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_CHANGE_SHOW_MESSAGE,
			value,
			message
		});
	},
	submit: fields => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.LOGIN_SUBMIT,
			fields
		});
	}
};

let Profile = {
	changeIsWaiting: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.PROFILE_CHANGE_IS_WAITING,
			value
		});
	},
	changeShowMessage: (value, message) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.PROFILE_CHANGE_SHOW_MESSAGE,
			value,
			message
		});
	},
};

let Reactivate = {
	changeIsWaiting: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.REACTIVATE_CHANGE_IS_WAITING,
			value
		});
	}
};

export default {
	Activate, Conversation, Create, Fields, Home, Login, Profile, Reactivate
};