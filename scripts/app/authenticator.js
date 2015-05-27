import {when} from '../libs';

module.exports = ({
	login: function(email, password) {return
		when(request({
			url: 'http://localhost:3001/sessions/create',
			method: 'POST',
			crossOrigin: true,
			type: 'json',
			data: {
				username, password
			}
		}))
		.then(function(response) {
	// We get a JWT back.
	let jwt = response.id_token;
	// We trigger the LoginAction with that JWT.
	LoginActions.loginUser(jwt);
	return true;
	});
	}
	}
});