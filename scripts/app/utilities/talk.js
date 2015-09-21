import {Api} from '../constants';
import User from './user';
import reqwest from 'reqwest';
import when from 'when';

export default {
	ask: function(data, callback) {
		reqwest({
			method: 'post',
			crossOrigin: true,
			url: Api.ANSWER,
			contentType: 'application/json',
			data: JSON.stringify(data),
			headers: {
				'X-Session-Token': User.get(sessionStorage, 'sessionID')
			},
			complete: callback
		});
	},
	initialize: function(callback) {
		let suggestions = when(reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.SUGGESTIONS,
			headers: {'X-Session-Token': User.get(sessionStorage, 'sessionID')}
		}));


		let locationError = {
			status: 408,
			response: JSON.stringify({
				message: 'Could not retrieve location'
			})
		};

		let location = when.promise((resolve, reject) => {
			// For faster testing!
			resolve({latitude: 32.8781238, longitude: -117.2038344});

			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(response => {
					resolve(response.coords);
				});
			} else {
				reject(locationError);
			}
		}).timeout(15000, locationError);

		when.join(suggestions, location).then(callback).catch(callback);
	}
};