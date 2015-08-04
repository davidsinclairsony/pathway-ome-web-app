import _ from 'lodash';
import {Buffer} from 'buffer';
import crypto from 'crypto';
import reqwest from 'reqwest';
import uuid from 'node-uuid';
let key = 'gcZFlslKi1l7JRrUCsfwkg==​';
let keyBuf = new Buffer(key, 'base64');
let deviceID = uuid.v4();

let decryptRegisterResponse = function(response) {
  var ivBuf = new Buffer(response.iv, 'base64');
  var dataBuf = new Buffer(response.encryptedPayload, 'base64');

  var decipher = crypto.createDecipheriv('aes-128-cbc', keyBuf, ivBuf);
  decipher.setAutoPadding(false);

  var dec = decipher.update(dataBuf, 'base64', 'utf-8');
  dec += decipher.final('utf-8');

  return JSON.parse(_.trim(dec, '\0'));
};

let encryptCreatePayload = function(createPayload, keyBuf, ivBuf) {
  var cipher = crypto.createCipheriv('aes-128-cbc', keyBuf, ivBuf);
  var encoded = cipher.update(JSON.stringify(createPayload), 'utf-8', 'base64');
  encoded += cipher.final('base64');
  return encoded;
};

reqwest({
	method: 'post',
	crossOrigin: true,
	url: 'http://atldev.pathway.com:5000/user/register',
	data: JSON.stringify({deviceID: deviceID}),
	contentType: 'application/json',
	error: function(response) {
		console.log("error:");
		console.log(response);
	},
	success: function(response) {
		console.log("success:");
		console.log(response);

		let decryptedRegisterResponse = decryptRegisterResponse(response);

		// Create user
		let createPayload = {
			firstName: 'David',
			lastName: 'Sinclair',
			email: 'david.sinclair@pathway.com',
			altEmail: 'david@sikhote.com',
			dateOfBirth: '01/01/1985',
			password: 'Pathway1',
			tcpVersion: '0.0.1',
			tcppDateSigned: '07-20-2015',
			deviceID: deviceID
		};

		let ivBuf = new Buffer(crypto.randomBytes(16));
		let userKeyBuf = new Buffer(decryptedRegisterResponse.userKey, 'base64');
		let encryptedPayload = encryptCreatePayload(createPayload, userKeyBuf, ivBuf);

		reqwest({
			method: 'POST',
			crossOrigin: true,
			url: 'http://atldev.pathway.com:5000/user',
			contentType: 'application/json',
			headers: {'X-Session-Token': decryptedRegisterResponse.sessionID},
			data: JSON.stringify({
				iv: ivBuf.toString('base64'),
				encryptedPayload: encryptedPayload
			}),
			error: function(response) {
				console.log("error:");
				console.log(response);
			},
			success: function(response) {
				console.log("second success:");
				console.log(response);
			}
		});
	}
});