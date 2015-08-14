import keymirror from 'keymirror';

const Actions = keymirror({
	ACTIVATE_CHANGE_IS_WAITING: null,
	ACTIVATE_CHANGE_SHOW_MESSAGE: null,
	ACTIVATE_SUBMIT: null,
	CREATE_CHANGE_AGREED_TO_CONSENT: null,
	CREATE_CHANGE_IS_WAITING: null,
	CREATE_CHANGE_SHOW_CONSENT: null,
	CREATE_CHANGE_SHOW_MESSAGE: null,
	CREATE_SUBMIT: null,
	FIELDS_CHANGE_SHOW_HELP: null,
	FIELDS_ON_FIELD_CHANGE: null,
	HOME_TOGGLE_SHOW_MENU: null,
	LOGIN_CHANGE_IS_WAITING: null,
	REACTIVATE_CHANGE_IS_WAITING: null
});

// const BASE_URL = 'http://' + window.location.host + '/api/v1/';
const BASE_URL = 'http://atldev.pathway.com:5000/';

const Api = {
	KEY: 'gcZFlslKi1l7JRrUCsfwkg==​',
	BASE_URL: BASE_URL,
	USER_REGISTER: BASE_URL + 'user/register',
	USER_CREATE: BASE_URL + 'user',
	USER_LOGIN: BASE_URL + 'user/login',
	USER_ACTIVATE: BASE_URL + 'user/activate'
};

const Security = {
	PW_SALT: 'You cant stop the signal, Mal. ' +
		'Everything goes somewhere, and I go everywhere.'
};

export default {Actions, Api, Security};