import field from './fields/field';
import React from 'react/addons';
import base from './base';
import assign from 'object-assign';

export default React.createClass(assign({}, base, {
	displayName: 'Fields',
	render: function() {
		let inner = [];

		Object.keys(this.props.fields).forEach(key => {
			let help = {
				isValid: this.props.fields[key].isValid,
				content: this.props.fields[key].help,
				showHelp: this.props.fields[key].showHelp,
				required: this.props.fields[key].required,
				showIcon: this.props.fields[key].showIcon
			};

			switch(key) {
				case 'name':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Name',
							htmlFor: 'firstName'
						},
						input: {
							submitHandler: this.props.submitHandler,
							count: 2,
							htmlType: 'text',
							ids: ['firstName', 'lastName'],
							name: key,
							placeholders: ['First', 'Last'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'email':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Email',
							htmlFor: 'email'
						},
						input: {
							submitHandler: this.props.submitHandler,
							emailBlurHandler: this.props.emailBlurHandler,
							count: 1,
							htmlType: 'email',
							ids: ['email'],
							name: key,
							placeholders: ['Email'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'singlePassword':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Password',
							htmlFor: 'password'
						},
						input: {
							submitHandler: this.props.submitHandler,
							count: 1,
							htmlType: 'password',
							ids: ['password'],
							name: key,
							placeholders: ['Password'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'doublePassword':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Password',
							htmlFor: 'password'
						},
						input: {
							submitHandler: this.props.submitHandler,
							count: 2,
							htmlType: 'password',
							ids: ['password', 'repeatPassword'],
							name: key,
							placeholders: ['Password', 'Confirm'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'newPassword':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'New Password',
							htmlFor: 'newPassword'
						},
						input: {
							submitHandler: this.props.submitHandler,
							count: 2,
							htmlType: 'password',
							ids: ['newPassword', 'repeatPassword'],
							name: key,
							placeholders: ['Password', 'Confirm'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'dob':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Date of Birth',
							htmlFor: 'month'
						},
						input: {
							submitHandler: this.props.submitHandler,
							characterLimiters: [2, 2, 4],
							count: 3,
							htmlType: 'text',
							ids: ['month', 'day', 'year'],
							name: key,
							placeholders: ['MM', 'DD', 'YYYY'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'pin':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Pin',
							htmlFor: 'pin1'
						},
						input: {
							submitHandler: this.props.submitHandler,
							characterLimiters: [4],
							count: 1,
							htmlType: 'text',
							ids: ['pin'],
							name: key,
							placeholders: ['# # # #'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'securityQuestion':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Security Question',
							htmlFor: 'securityQuestion'
						},
						input: {
							submitHandler: this.props.submitHandler,
							count: 1,
							htmlType: 'text',
							ids: ['securityQuestion'],
							name: key,
							placeholders: ['Security Question'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'securityAnswer':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Security Answer',
							htmlFor: 'securityAnswer'
						},
						input: {
							submitHandler: this.props.submitHandler,
							count: 1,
							htmlType: 'text',
							ids: ['securityAnswer'],
							name: key,
							placeholders: ['Security Answer'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'nutritionGoal':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Nutrition Goal *',
							htmlFor: 'nutritionGoal'
						},
						input: {
							ids: ['nutritionGoal'],
							name: key,
							type: 'dropDown',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : [],
							options: [
								['none', ''],
								['lose_weight', 'Lose Weight'],
								['maintain_weight', 'Maintain Weight'],
								['gain_weight', 'Gain Weight']
							]
						},
						help
					}));
					break;
				case 'gender':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Gender *',
							htmlFor: 'gender'
						},
						input: {
							ids: ['gender'],
							name: key,
							type: 'dropDown',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : [],
							options: [
								['none', ''],
								['female', 'Female'],
								['male', 'Male']
							]
						},
						help
					}));
					break;
				case 'height':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Height *',
							htmlFor: 'height'
						},
						input: {
							ids: ['height'],
							name: key,
							type: 'heightSlider',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'weight':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Weight',
							htmlFor: 'weight'
						},
						input: {
							ids: ['weight'],
							name: key,
							type: 'weightSlider',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
				case 'activityLevel':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Activity Level *',
							htmlFor: 'activityLevel'
						},
						input: {
							ids: ['activityLevel'],
							name: key,
							type: 'dropDown',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : [],
							options: [
								['none', ''],
								['sedentary', 'Sedentary'],
								['lightly_active', 'Lightly Active'],
								['moderately_active', 'Moderately Active'],
								['very_active', 'Very Active'],
								['extra_active', 'Extra Active']
							]
						},
						help
					}));
					break;
				case 'dietType':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Diet Type *',
							htmlFor: 'dietType'
						},
						input: {
							ids: ['dietType'],
							name: key,
							type: 'dropDown',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : [],
							options: [
								['none', ''],
								['low_carb', 'Low Carb'],
								['low_fat', 'Low Fat'],
								['balanced', 'Balanced'],
								['mediterranean', 'Mediterranean']
							]
						},
						help
					}));
					break;
				case 'diabetic':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Diabetic',
							htmlFor: 'diabeticNo'
						},
						input: {
							className: 'short boolean',
							name: key,
							multiple: false,
							type: 'checkList',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : [],
							data: [
								{id: false, name: 'No'},
								{id: true, name: 'Yes'}
							]
						},
						help
					}));
					break;
				case 'highCholesterol':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'High Cholesterol',
							htmlFor: 'highCholesterolNo'
						},
						input: {
							className: 'short boolean',
							name: key,
							multiple: false,
							type: 'checkList',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : [],
							data: [
								{id: false, name: 'No'},
								{id: true, name: 'Yes'}
							]
						},
						help
					}));
					break;
				case 'allergies':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Allergies',
							htmlFor: 'allergies'
						},
						input: {
							className: 'short',
							name: key,
							multiple: true,
							type: 'checkList',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : [],
							data: [
								{id: 'wheat', name: 'Wheat'},
								{id: 'gluten', name: 'Gluten'},
								{id: 'milk', name: 'Milk'},
								{id: 'soy', name: 'Soy'},
								{id: 'egg', name: 'Egg'},
								{id: 'fish', name: 'Fish'},
								{id: 'shellfish', name: 'Shellfish'},
								{id: 'peanut', name: 'Peanut'},
								{id: 'treenut', name: 'Treenut'}
							]
						},
						help
					}));
					break;
				case 'diet':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Diet',
							htmlFor: 'diet'
						},
						input: {
							className: 'short',
							name: key,
							multiple: true,
							type: 'checkList',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : [],
							data: [
								{id: 'vegetarian', name: 'Vegetarian'},
								{id: 'vegan', name: 'Vegan'},
								{id: 'kosher', name: 'Kosher'},
								{id: 'halal', name: 'Halal'},
								{id: 'paleo', name: 'Paleo'}
							]
						},
						help
					}));
					break;
			}
		});

		return (<ul className='fields'>{inner}</ul>);
	}
}));