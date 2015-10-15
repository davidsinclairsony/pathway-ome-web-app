import keymirror from 'keymirror';
import {baseUrl} from '../config.json';

const Actions = keymirror({
	ACTIVATE_CHANGE_IS_WAITING: null,
	ACTIVATE_CHANGE_SHOW_MESSAGE: null,
	ACTIVATE_SUBMIT: null,
	CONVERSATION_ASK: null,
	CONVERSATION_ASK_ANOTHER: null,
	CONVERSATION_ASKER_SUBMIT: null,
	CONVERSATION_ON_ASKER_INPUT_CHANGE: null,
	CONVERSATION_CHANGE_IS_WAITING: null,
	CONVERSATION_CHANGE_SHOW_MESSAGE: null,
	CONVERSATION_CUSTOM_SUBMIT: null,
	CONVERSATION_RETRY: null,
	CONVERSATION_SAVE_CUSTOM: null,
	CONVERSATION_CHANGE_SHOW_COMMENT: null,
	CONVERSATION_UPDATE_FEEDBACK: null,
	CONVERSATION_SAVE_COMMENT: null,
	CONVERSATION_COMMENT_SUBMIT: null,
	CREATE_CHANGE_AGREED_TO_CONSENT: null,
	CREATE_CHANGE_IS_WAITING: null,
	CREATE_CHANGE_SHOW_CONSENT: null,
	CREATE_CHANGE_SHOW_MESSAGE: null,
	CREATE_SUBMIT: null,
	FIELDS_CHANGE_SHOW_HELP: null,
	FIELDS_FILL: null,
	FIELDS_ON_EMAIL_BLUR: null,
	FIELDS_ON_FIELD_CHANGE: null,
	FIELDS_RESET_VALIDATION: null,
	HOME_TOGGLE_SHOW_MENU: null,
	LOGIN_CHANGE_IS_WAITING: null,
	LOGIN_CHANGE_SHOW_MESSAGE: null,
	LOGIN_SUBMIT: null,
	PROFILE_CHANGE_SHOW_MESSAGE: null,
	PROFILE_SUBMIT: null,
	REACTIVATE_CHANGE_IS_WAITING: null
});

const Api = {
	KEY: 'gcZFlslKi1l7JRrUCsfwkg==',
	BASE_URL: baseUrl,
	USER: baseUrl + 'user',
	USER_REGISTER: baseUrl + 'user/register',
	USER_SESSION: baseUrl + 'user/session',
	USER_LOGIN: baseUrl + 'user/login',
	USER_ACTIVATE: baseUrl + 'user/activate',
	USER_HCI: baseUrl + 'user/hci',
	USER_CHECKEMAIL: baseUrl + 'user/checkemail',
	SUGGESTIONS: baseUrl + 'suggestions',
	ANSWER: baseUrl + 'answer',
	ANSWER_FEEDBACK: baseUrl + 'answer/feedback'
};

const Security = {
	PW_SALT: 'You cant stop the signal, Mal. ' +
		'Everything goes somewhere, and I go everywhere.'
};

export default {Actions, Api, Security};
