import {Api} from '../constants';
import User from './user';
import reqwest from 'reqwest';
import when from 'when';

export default {
	ask: function(data, callback) {
		// Add in location or throw a fit
		let locationError = {
			status: 408,
			response: JSON.stringify({
				message: 'Could not retrieve location'
			})
		};

		var locationPromise = when.promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(response => {
					resolve(response.coords);
				});
			} else {
				reject(locationError);
			}
		}).timeout(15000, locationError);

		when(locationPromise)
			.then(location => {
				data.location = {
					lat: location.latitude,
					lng: location.longitude
				};

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
			})
			.catch(callback);
		;
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