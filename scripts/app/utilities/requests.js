import {Api} from '../constants';
import User from './user';
import reqwest from 'reqwest';

export default {
	suggestions: function(callback) {
		reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.SUGGESTIONS,
			contentType: 'application/json',
			headers: {'X-Session-Token': User.get(sessionStorage, 'sessionID')},
			complete: callback
		});
	}
};