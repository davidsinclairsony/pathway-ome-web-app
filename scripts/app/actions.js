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
	ask: question => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_ASK,
			question
		});
	},
	askAnother: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_ASK_ANOTHER
		});
	},
	askerChangeShowHelp: o => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_ASKER_CHANGE_SHOW_HELP,
			o
		});
	},
	askerOnInputChange: o => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_ASKER_ON_INPUT_CHANGE,
			o
		});
	},
	askerSubmit: id => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_ASKER_SUBMIT,
			id
		});
	},
	onAskerInputChange: data => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_ON_ASKER_INPUT_CHANGE,
			data
		});
	},
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
	},
	customSubmit: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_CUSTOM_SUBMIT
		});
	},
	retry: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_RETRY
		});
	},
	saveCustom: value => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_SAVE_CUSTOM,
			value
		});
	},
	changeShowComment: (id, value) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_CHANGE_SHOW_COMMENT,
			id,
			value
		});
	},
	updateFeedback: (id, feedback) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_UPDATE_FEEDBACK,
			id,
			feedback
		});
	},
	saveComment: (id, comment) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_SAVE_COMMENT,
			id,
			comment
		});
	},
	commentSubmit: id => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CONVERSATION_COMMENT_SUBMIT,
			id
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
	onEmailBlur: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.FIELDS_ON_EMAIL_BLUR
		});
	},
	onFieldChange: description => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.FIELDS_ON_FIELD_CHANGE,
			description
		});
	},
	resetValidation: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.FIELDS_RESET_VALIDATION
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
	submit: fields => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.PROFILE_SUBMIT,
			fields
		});
	}
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