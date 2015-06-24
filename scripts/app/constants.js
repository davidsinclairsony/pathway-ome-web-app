import {keyMirror} from '../libs';

let Actions = keyMirror({
	ACTIVATE_ACTIVATE: null,
	ACTIVATE_ACTIVATE_HANDLER: null,
	ACTIVATE_HIDE_ALL_HELP: null,
	ACTIVATE_ON_FIELD_CHANGE: null,
	ACTIVATE_RESPONSE_HANDLER: null,
	ACTIVATE_SUBMIT: null,
	ACTIVATE_TOGGLE_SHOW_HELP: null,
	ACTIVATE_VALIDATE_ALL: null,
	CREATE_GO_TO_STEP: null,
	CREATE_SET_CURRENT_STEP: null,
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