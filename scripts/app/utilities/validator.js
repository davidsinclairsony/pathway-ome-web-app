import {Joi} from '../../libs';

export default {
	validate: function(o) {
		switch(o.name) {
			case 'email':
				return this.isEmailValid(o.values[0]);
			case 'password':
				return this.isPasswordValid(o.values);
			case 'dob':
				return this.isDobValid(o.values);
			case 'name':
				return this.isNameValid(o.values);
			default:
				return true;
		}
	},
	isDobValid: dob => {
		let dobString = dob[0] + dob[1] + dob[2];

		// All numbers and length validation
		if(
			!/^\d+$/.test(dobString) ||
			dobString.length < 8
		) {
			return false;
		}

		// Age validation
		let today = new Date();
		let birthDate = new Date(dob[2], dob[0], dob[1]);
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();

		if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		if(age < 18) {
			return false;
		}

		return true;
	},
	isEmailValid: email => {
		return email && Joi.string().email({errorLevel: 2}).validate(email, error => {
			return error === null;
		});
	},
	isNameValid: values => {
		for(let i = 0; i < 2; i++) {
			if(!values[i] || values[i].length < 1) {
				return false;
			}
		}

		return true;
	},
	isPasswordValid: values => {
		if(values[0] !== values[1]) {
			return false;
		}

		let password = values[0];

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