import {keyMirror} from '../libs';

let actions = keyMirror({
	SUBMIT_LOGIN: null
});

let BASE_URL = 'http://localhost:3001/';

let api = {
	BASE_URL: BASE_URL,
	LOGIN_URL: BASE_URL + 'sessions/create',
	SIGNUP_URL: BASE_URL + 'users',
	LOGIN_USER: 'LOGIN_USER',
	LOGOUT_USER: 'LOGOUT_USER'
};

export {actions, api};