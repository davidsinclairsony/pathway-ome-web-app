import {keyMirror} from '../libs';

let Actions = keyMirror({
	ACTIVATE_CHANGE_IS_WAITING: null,
	CREATE_CHANGE_AGREED_TO_CONSENT: null,
	CREATE_CHANGE_IS_WAITING: null,
	CREATE_CHANGE_SHOW_CONSENT: null,
	FIELDS_CHANGE_SHOW_HELP: null,
	FIELDS_ON_FIELD_CHANGE: null,
	HOME_TOGGLE_SHOW_MENU: null,
	LOGIN_HIDE_ALL_HELP: null,
	LOGIN_ON_FIELD_CHANGE: null,
	LOGIN_RESPONSE_HANDLER: null,
	LOGIN_SUBMIT: null,
	LOGIN_TOGGLE_SHOW_HELP: null,
	LOGIN_TOGGLE_STAY_LOGGED_IN: null,
	LOGIN_VALIDATE_ALL: null,
});

let BASE_URL = 'http://' + window.location.host + '/api/v1/';

let Api = {
	BASE_URL: BASE_URL,
	LOGIN_URL: BASE_URL + 'user/login',
	CREATE_URL: BASE_URL + 'user/create',
	ACTIVATE_URL: BASE_URL + 'user/activate',
	GET_ACTIVATION_LINK_URL: BASE_URL + 'user/getActivationLink'
};

export default {Actions, Api};