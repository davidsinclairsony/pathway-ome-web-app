import _ from 'lodash';
import {Api} from '../constants';
import assign from 'object-assign';
import {Buffer} from 'buffer';
import crypto from 'crypto';
import reqwest from 'reqwest';
import uuid from 'node-uuid';

export default {
	activate: function(data, callback) {
		reqwest({
			method: 'post',
			crossOrigin: true,
			url: Api.USER_ACTIVATE,
			data: JSON.stringify(data),
			contentType: 'application/json',
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			complete: callback
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
			}).then(create).fail(callback);
		};
		create = response => {
			let decryptedResponse = this.decrypt(
				response.encryptedPayload, Api.KEY, response.iv
			);

			this.save(sessionStorage, 'sessionID', decryptedResponse.sessionID);
			this.save(sessionStorage, 'userKey', decryptedResponse.userKey);

			this.request({
				method: 'post',
				url: Api.USER_CREATE,
				data,
				callback,
				key: this.get(sessionStorage, 'userKey'),
				headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')}
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
		dec += decipher.final('utf-8');

		return JSON.parse(_.trim(dec, '\0'));
	},
	encrypt: function(data, keyBuf, ivBuf) {
		let cipher = crypto.createCipheriv('aes-128-cbc', keyBuf, ivBuf);
		let encoded = cipher.update(JSON.stringify(data), 'utf8', 'base64');

		encoded += cipher.final('base64');

		return encoded;
	},
	fetchProfile: function(callback) {
		reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.USER_HCI,
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			complete: callback
		});

		/*
		reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.USER_GET,
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			complete: callback
		});*/
	},
	get: function(storage, key) {
		if(storage.authentication) {
			return JSON.parse(storage.authentication)[key];
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
			}).then(login).fail(callback);
		};
		login = response => {
			this.save(sessionStorage, 'sessionID', response.sessionToken);

			this.request({
				method: 'post',
				url: Api.USER_LOGIN,
				data,
				callback,
				key: Api.KEY,
				headers: {
					'X-Session-Token': this.get(sessionStorage, 'sessionID'),
					'X-Device-ID': this.getDeviceID()
				}
			});
		};

		session();
	},
	request: function(options) {
		let ivBuf = new Buffer(crypto.randomBytes(16));
		let keyBuf = new Buffer(options.key, 'base64');
		let data = assign({}, options.data, {
			deviceID: this.get(localStorage, 'deviceID')
		});

		reqwest({
			method: options.method,
			crossOrigin: true,
			url: options.url,
			contentType: 'application/json',
			headers: options.headers,
			data: JSON.stringify({
				iv: ivBuf.toString('base64'),
				encryptedPayload: this.encrypt(data, keyBuf, ivBuf)
			}),
			complete: options.callback
		});
	},
	save: function(storage, key, value) {
		let data = {};

		if(storage.authentication) {
			data = JSON.parse(storage.authentication);
		}

		data[key] = value;

		storage.authentication = JSON.stringify(data);
	},
	update: function(protectedData, hciData, callback) {
		console.log(hciData);
		console.log(protectedData);
		reqwest({
			method: 'post',
			crossOrigin: true,
			contentType: 'application/json',
			url: Api.USER_HCI,
			data: JSON.stringify(hciData),
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			complete: callback
		});

		/*
		reqwest({
			method: 'get',
			crossOrigin: true,
			url: Api.USER_GET,
			headers: {'X-Session-Token': this.get(sessionStorage, 'sessionID')},
			complete: callback
		});*/
	}
};