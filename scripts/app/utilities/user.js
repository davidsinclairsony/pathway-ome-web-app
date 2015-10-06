import _ from 'lodash';
import Actions from '../actions';
import {Api, Security} from '../constants';
import assign from 'object-assign';
import {Buffer} from 'buffer';
import crypto from 'crypto';
import history from '../history';
import reqwest from 'reqwest';
import uuid from 'node-uuid';
import when from 'when';

export default {
	activate: function(data, callback) {
		reqwest({
			method: 'post',
			crossOrigin: true,
			url: Api.USER_ACTIVATE,
			data: JSON.stringify(data),
			contentType: 'application/json',
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			complete: response => {this.errorHandler(response, callback);}
		});
	},
	create: function(data, callback) {
		let deviceID, register, create;

		deviceID = this.getDeviceID();
		register = () => {
			reqwest({
				method: 'post',
				crossOrigin: true,
				url: Api.USER_REGISTER,
				data: JSON.stringify({deviceID}),
				contentType: 'application/json'
			})
				.then(create)
				.fail(response => {this.errorHandler(response, callback);})
			;
		};
		create = response => {
			let decryptedResponse = this.decrypt(
				response.encryptedPayload, Api.KEY, response.iv
			);

			sessionStorage.removeItem('user');
			this.save(sessionStorage, 'sessionID', decryptedResponse.sessionID);
			this.save(sessionStorage, 'userKey', decryptedResponse.userKey);

			let ivBuf = new Buffer(crypto.randomBytes(16));
			let keyBuf = new Buffer(this.get(sessionStorage, 'userKey'), 'base64');

			reqwest({
				method: 'post',
				crossOrigin: true,
				url: Api.USER,
				contentType: 'application/json',
				headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
				data: JSON.stringify({
					iv: ivBuf.toString('base64'),
					encryptedPayload: this.encrypt(data, keyBuf, ivBuf)
				}),
				complete: response => {this.errorHandler(response, callback);},
				error: response => {this.errorHandler(response, callback);}
			});
		};

		register();
	},
	decrypt: function(encryptedData, key, iv) {
		const ivBuf = new Buffer(iv, 'base64');
		const dataBuf = new Buffer(encryptedData, 'base64');
		const keyBuf = new Buffer(key, 'base64');
		let decipher = crypto.createDecipheriv('aes-128-cbc', keyBuf, ivBuf);

		decipher.setAutoPadding(false);

		let dec = decipher.update(dataBuf, 'base64', 'utf8');
		dec += decipher.final('utf8');

		return JSON.parse(_.trim(dec, '\0'));
	},
	decryptUserKey: function(encryptedData, key, iv) {
		const ivBuf = new Buffer(iv, 'base64');
		const dataBuf = new Buffer(encryptedData, 'base64');
		const keyBuf = new Buffer(key, 'base64');
		let decipher = crypto.createDecipheriv('aes-128-cbc', keyBuf, ivBuf);

		decipher.setAutoPadding(false);

		let dec = decipher.update(dataBuf, 'base64', 'base64');
		dec += decipher.final('base64');

		return dec;
	},
	doesEmailExist: function(data, callback) {
		reqwest({
			method: 'post',
			crossOrigin: true,
			url: Api.USER_CHECKEMAIL,
			data: JSON.stringify(data),
			contentType: 'application/json',
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			complete: response => {this.errorHandler(response, callback);}
		});
	},
	encrypt: function(data, keyBuf, ivBuf) {
		let cipher = crypto.createCipheriv('aes-128-cbc', keyBuf, ivBuf);
		let encoded = cipher.update(JSON.stringify(data), 'utf8', 'base64');

		encoded += cipher.final('base64');

		return encoded;
	},
	errorHandler: function(response, callback) {
		if(
			response.status &&
			(response.status < 200 || response.status > 299)
		) {
			let error = JSON.parse(response.response).message;

			if(Array.isArray(error)) {
				error = error[0];
			}

			switch(error) {
				case 'this is not a valid GUID: undefined':
				case 'data field not found: userGUID':
					this.logout();
					break;
				default:
					callback(response);
			}
		} else {
			callback(response);
		}
	},
	fetchPii: function(resolve, reject) {
		reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.USER,
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
		})
			.then(response => {
				let decryptedResponse = this.decrypt(
					response.encryptedPayload,
					this.get(sessionStorage,'userKey'),
					response.iv
				);

				resolve(decryptedResponse);
			})
			.fail(reject)
		;
	},
	fetchProfile: function(callback) {
		let hci = when(reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.USER_HCI,
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			success: Actions.Fields.fill
		}));

		let pii = when(reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.USER,
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			success: response => {
				let decryptedResponse = this.decrypt(
					response.encryptedPayload,
					this.get(sessionStorage,'userKey'),
					response.iv
				);

				Actions.Fields.fill(decryptedResponse);
			}
		}));

		when.join(hci, pii)
			.then(response => {this.errorHandler(response, callback);})
			.catch(response => {this.errorHandler(response, callback);})
		;
	},
	get: function(storage, key) {
		if(storage.user) {
			return JSON.parse(storage.user)[key];
		} else {
			return undefined;
		}
	},
	getDeviceID: function() {
		let deviceID = this.get(localStorage, 'deviceID');

		if(!deviceID) {
			this.save(localStorage, 'deviceID', uuid.v4());
			deviceID = this.get(localStorage, 'deviceID');
		}

		return deviceID;
	},
	ensureAuthentication: function(nextState, replaceState) {
		if(this.get(localStorage, 'deviceID')) {
			if(!this.get(sessionStorage, 'sessionID')) {
				replaceState({nextPathname: nextState.location.pathname}, '/login');
			}
		} else {
			replaceState({nextPathname: nextState.location.pathname}, '/create');
		}
	},
	login: function(data, callback) {
		let deviceID, session, login;

		deviceID = this.getDeviceID();
		session = () => {
			reqwest({
				method: 'post',
				crossOrigin: true,
				url: Api.USER_SESSION,
				data: JSON.stringify({deviceID}),
				contentType: 'application/json'
			})
				.then(login)
				.fail(response => {this.errorHandler(response, callback);})
			;
		};
		login = response => {
			sessionStorage.removeItem('user');
			this.save(sessionStorage, 'sessionID', response.sessionToken);

			let ivBuf = new Buffer(crypto.randomBytes(16));
			let keyBuf = new Buffer(Api.KEY, 'base64');
			let newData = assign({}, data, {
				deviceID: this.get(localStorage, 'deviceID')
			});

			reqwest({
				method: 'post',
				crossOrigin: true,
				url: Api.USER_LOGIN,
				contentType: 'application/json',
				headers: {
					'X-Session-Token': this.get(sessionStorage, 'sessionID'),
					'X-Device-ID': this.getDeviceID()
				},
				data: JSON.stringify({
					iv: ivBuf.toString('base64'),
					encryptedPayload: this.encrypt(newData, keyBuf, ivBuf)
				}),
				success: response => {
					let decryptedUserKey = this.decryptUserKey(
						response.userKey,
						Api.KEY,
						response.iv
					);

					this.save(sessionStorage, 'userKey', decryptedUserKey);
					this.errorHandler(response, callback);
				},
				error: response => {this.errorHandler(response, callback);}
			});
		};

		session();
	},
	logout: function() {
		sessionStorage.removeItem('user');
		history.replaceState(null, '/login');
	},
	passwordHasher: function(password) {
		let salt = new Buffer(Security.PW_SALT).toString('base64');
		return crypto.pbkdf2Sync(password, salt, 1000, 128).toString('base64');
	},
	save: function(storage, key, value) {
		let data = {};

		if(storage.user) {
			data = JSON.parse(storage.user);
		}

		data[key] = value;

		storage.user = JSON.stringify(data);
	},
	saveObject: function(storage, object) {
		Object.keys(object).map(o => {
			if(typeof(object[o]) !== 'undefined') {
				this.save(storage, o, object[o]);
			}
		});
	},
	update: function(pii, hci, callback) {
		let ivBuf = new Buffer(crypto.randomBytes(16));
		let keyBuf = new Buffer(this.get(sessionStorage, 'userKey'), 'base64');

		let piiPromise = when(reqwest({
			method: 'put',
			crossOrigin: true,
			contentType: 'application/json',
			url: Api.USER,
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			data: JSON.stringify({
				iv: ivBuf.toString('base64'),
				encryptedPayload: this.encrypt(pii, keyBuf, ivBuf)
			})
		}));

		let hciPromise = when(reqwest({
			method: 'post',
			crossOrigin: true,
			contentType: 'application/json',
			url: Api.USER_HCI,
			data: JSON.stringify(hci),
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')}
		}));

		when.join(piiPromise, hciPromise)
			.then(response => {this.errorHandler(response, callback);})
			.catch(response => {this.errorHandler(response, callback);})
		;
	}
};