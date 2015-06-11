import {when, reqwest} from '../../libs';
import {Api} from '../constants';
import Actions from '../actions';

export default {
	create: function(data) {
		return this.handleCreate(when(reqwest({
			url: Api.CREATE_URL,
			method: 'POST',
			type: 'json',
			data: data
		})));
	},
	handleCreate: function(createPromise) {
		return createPromise.then(function(response) {
			Actions.Create.responseHandler(response);
			return true;
		});
	},
	login: function(data) {
		return this.handleLogin(when(reqwest({
			url: Api.LOGIN_URL,
			method: 'POST',
			type: 'json',
			data: data
		})));
	},
	handleLogin: function(loginPromise) {
		return loginPromise.then(function(response) {
			Actions.Login.responseHandler(response);
			return true;
		});
	}
};