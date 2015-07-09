import {keymirror, React, ReactRouter} from '../libs';

let Actions = keymirror({
	ACTIVATE_CHANGE_IS_WAITING: null,
	CREATE_CHANGE_AGREED_TO_CONSENT: null,
	CREATE_CHANGE_IS_WAITING: null,
	CREATE_CHANGE_SHOW_CONSENT: null,
	FIELDS_CHANGE_SHOW_HELP: null,
	FIELDS_ON_FIELD_CHANGE: null,
	HOME_TOGGLE_SHOW_MENU: null,
	LOGIN_CHANGE_IS_WAITING: null,
	REACTIVATE_CHANGE_IS_WAITING: null
});

let BASE_URL = 'http://' + window.location.host + '/api/v1/';

let Api = {
	KEY: '$2y$10$GJLyasQ5wyKHx8VZ2T6BgOZPu7Y9Q5DSFLixqOygH8i1EI7NzDEJm',
	BASE_URL: BASE_URL,
	LOGIN_URL: BASE_URL + 'user/login',
	CREATE_URL: BASE_URL + 'user/create',
	ACTIVATE_URL: BASE_URL + 'user/activate',
	GET_ACTIVATION_LINK_URL: BASE_URL + 'user/getActivationLink'
};

export default {Actions, Api};