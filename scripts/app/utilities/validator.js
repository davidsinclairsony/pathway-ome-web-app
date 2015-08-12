import Joi from 'joi';

export default {
	validate: function(o) {
		switch(o.name) {
			case 'email':
				return this.isEmailValid(o.values[0]);
			case 'singlePassword':
				return this.isSinglePasswordValid(o.values);
			case 'doublePassword':
				return this.isDoublePasswordValid(o.values);
			case 'dob':
				return this.isDobValid(o.values);
			case 'name':
				return this.isNameValid(o.values);
			case 'pin':
				return this.isPinValid(o.values);
			default:
				return true;
		}
	},
	isPinValid: pin => {
		let pinString = pin[0] + pin[1] + pin[2] + pin[3];

		// All numbers and length validation
		if(
			!/^\d+$/.test(pinString) ||
			pinString.length < 4
		) {
			return false;
		}

		return true;
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

		// Valid month range
		if(dob[0] < 0 || dob[0] > 12) {
			return false;
		}

		// Valid day range
		if(dob[1] < 1 || dob[1] > 31) {
			return false;
		}

		// Age validation
		let today = new Date();
		let birthDate = new Date(dob[2] + '-' + dob[0] + '-' +  dob[1]);
		let age = today.getFullYear() - birthDate.getFullYear();
		let m = today.getMonth() - birthDate.getMonth();

		if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		if(age < 18 || age > 120) {
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
	isSinglePasswordValid: values => {
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
	},
	isDoublePasswordValid: function(values) {
		if(values[0] !== values[1]) {
			return false;
		}

		if(!this.isSinglePasswordValid(values)) {
			return false;
		}

		return true;
	}
};