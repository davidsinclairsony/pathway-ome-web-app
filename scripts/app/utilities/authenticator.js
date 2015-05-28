import {when, reqwest} from '../../libs';
import {api} from '../constants';
import Actions from '../actions';

export default {
	login: function(email, password) {
		return this.handleAuth(when(reqwest({
			url: api.LOGIN_URL,
			method: 'POST',
			crossOrigin: true,
			type: 'json',
			data: {email, password}
		})));
	},
	logout: function() {
		Actions.Login.logoutUser();
	},
	signup: function(email, password) {
		return this.handleAuth(when(reqwest({
			url: api.SIGNUP_URL,
			method: 'POST',
			crossOrigin: true,
			type: 'json',
			data: {email, password}
		})));
	},
	handleAuth: function(loginPromise) {
		return loginPromise.then(function(response) {
			var jwt = response.id_token;
			Actions.Login.loginUser(jwt);

			return true;
		});
	}
};