import {keyMirror} from '../libs';

let Actions = keyMirror({
	CREATE_HIDE_ALL_HELP: null,
	CREATE_ON_FIELD_CHANGE: null,
	CREATE_RESPONSE_HANDLER: null,
	CREATE_SET_HELP: null,
	CREATE_SUBMIT: null,
	CREATE_TOGGLE_SHOW_HELP: null,
	CREATE_VALIDATE_ALL: null,
	LOGIN_HIDE_ALL_HELP: null,
	LOGIN_ON_FIELD_CHANGE: null,
	LOGIN_RESPONSE_HANDLER: null,
	LOGIN_SUBMIT: null,
	LOGIN_TOGGLE_SHOW_HELP: null,
	LOGIN_TOGGLE_STAY_LOGGED_IN: null,
	LOGIN_VALIDATE_ALL: null,
	START_TOGGLE_SHOW_EXPANDED: null
});

let BASE_URL = 'http://' + window.location.host + '/api/v1/';

let Api = {
	BASE_URL: BASE_URL,
	LOGIN_URL: BASE_URL + 'user/login',
	CREATE_URL: BASE_URL + 'user/create',
	LOGIN_USER: BASE_URL + 'user/login',
	LOGOUT_USER: BASE_URL + 'user/logout'
};

export default {Actions, Api};