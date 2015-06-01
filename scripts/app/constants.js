import {keyMirror} from '../libs';

let Actions = keyMirror({
	CREATE_VALIDATE_FIELD: null,
	CREATE_SHOW_HELP: null,
	CREATE_SET_HELP: null,
	CREATE_RESET: null,
	LOGIN_VALIDATE_FIELD: null,
	LOGIN_SHOW_HELP: null,
	LOGIN_SET_HELP: null,
	LOGIN_RESET: null
});

let BASE_URL = 'http://localhost:3001/';

let Api = {
	BASE_URL: BASE_URL,
	LOGIN_URL: BASE_URL + 'sessions/create',
	SIGNUP_URL: BASE_URL + 'users',
	LOGIN_USER: 'LOGIN_USER',
	LOGOUT_USER: 'LOGOUT_USER'
};

export default {
	Actions: Actions,
	Api: Api
};