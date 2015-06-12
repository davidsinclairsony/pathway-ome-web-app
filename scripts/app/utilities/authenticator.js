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
	handleCreate: function(promise) {
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
	handleLogin: function(promise) {
		return promise.then(function(response) {
			Actions.Login.responseHandler(response);
			return true;
		});
	},
	getActivationLink: function(data) {
		return this.handleGetActivationLink(when(reqwest({
			url: Api.GET_ACTIVATION_LINK_URL,
			method: 'POST',
			type: 'json',
			data: data
		})));
	},
	handleGetActivationLink: function(promise) {
		return promise.then(function(response) {
			Actions.Activate.responseHandler(response);
			return true;
		});
	},
};