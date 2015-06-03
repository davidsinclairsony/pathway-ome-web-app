import {when, reqwest} from '../../libs';
import {Api} from '../constants';
import Actions from '../actions';

export default {
	login: function(data) {
		return this.handleLogin(when(reqwest({
			url: Api.LOGIN_URL,
			method: 'POST',
			type: 'json',
			data: data
		})));
	},
	logout: function() {

	},
	create: function(data) {
		return this.handleCreate(when(reqwest({
			url: Api.CREATE_URL,
			method: 'POST',
			type: 'json',
			data: data
		})));
	},
	handleLogin: function(loginPromise) {
		return loginPromise.then(function(response) {
			var jwt = response.id_token;
			Actions.Login.loginUser(jwt);
			return true;
		});
	},
	handleCreate: function(createPromise) {
		return createPromise.then(function(response) {
			Actions.Create.success();
			return true;
		});
	}
};