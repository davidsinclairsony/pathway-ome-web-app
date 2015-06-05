import {keyMirror} from '../libs';

let Actions = keyMirror({
	CREATE_GO_TO_VERIFY: null,
	CREATE_SET_HELP: null,
	CREATE_SHOW_HELP: null,
	CREATE_SUBMIT: null,
	CREATE_SUCCESS: null,
	CREATE_VALIDATE_ALL: null,
	CREATE_VALIDATE_FIELD: null,
	LOGIN_GO_TO_RESET_PASSWORD: null,
	LOGIN_SHOW_HELP: null,
	LOGIN_SET_HELP: null,
	LOGIN_SUBMIT: null,
	LOGIN_VALIDATE_ALL: null,
	LOGIN_VALIDATE_FIELD: null
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