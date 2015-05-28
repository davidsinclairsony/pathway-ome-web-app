import {Joi} from '../../libs';

export default {
	isEmailValid: function(email) {
		return email && Joi.string().email().validate(email, function(error) {
			return error === null;
		});
	},
	isPasswordValid: function(password) {
		if(!password) {
			return false;
		}

		let hasUpperCase = /[A-Z]/g;
		let hasLowerCase = /[a-z]/g;
		let hasNumber = /[0-9]/g;
		let hasSpecialCharacter = /[`~!@#$%^&*()_\-+={}[\]\|:;"'<>,.?\/]/g;

		if(
			hasUpperCase.test(password) &&
			hasLowerCase.test(password) &&
			(hasNumber.test(password) || hasSpecialCharacter.test(password)) &&
			password.length >= 8
		) {
			return true;
		} else {
			return false;
		}
	}
};