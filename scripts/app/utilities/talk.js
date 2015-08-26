import {Api} from '../constants';
import User from './user';
import reqwest from 'reqwest';

export default {
	ask: function(data, callback) {
		reqwest({
			method: 'post',
			crossOrigin: true,
			url: Api.ANSWER,
			contentType: 'application/json',
			data: JSON.stringify(data),
			headers: {'X-Session-Token': User.get(sessionStorage, 'sessionID')},
			complete: callback
		});
	},
	suggestions: function(callback) {
		reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.SUGGESTIONS,
			headers: {'X-Session-Token': User.get(sessionStorage, 'sessionID')},
			complete: callback
		});
	}
};