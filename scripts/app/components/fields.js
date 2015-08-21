//import Actions from '../actions';
//import assign from 'object-assign';
//import base from './base';
import field from './fields/field';
import React from 'react/addons';
//import ReactRouter from 'react-router';
//import TransitionGroup from '../utilities/velocityTransitionGroup.js';
//import Velocity from 'velocity-animate';

export default React.createClass({
	displayName: 'Fields',
	render: function() {
		let inner = [];

		Object.keys(this.props.fields).forEach(key => {
			let help = {
				isValid: this.props.fields[key].isValid,
				content: this.props.fields[key].help,
				showHelp: this.props.fields[key].showHelp,
				validate: this.props.fields[key].validate,
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
							count: 2,
							htmlType: 'email',
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
							content: 'Nutrition Goal',
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
							content: 'Gender',
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
								['male', 'Male'],
								['other', 'Other']
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
							content: 'Height',
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
				case 'activityLevel':
					inner.push(React.createElement(field, {
						key,
						classes: key,
						label: {
							content: 'Activity Level',
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
								['extra_active', 'Moderately Active']
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
							content: 'Diet Type',
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
								['low_carb', 'Low Card'],
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
								{id: 0, name: 'No'},
								{id: 1, name: 'Yes'}
							]
						},
						help: {validate: false}
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
								{id: 0, name: 'No'},
								{id: 1, name: 'Yes'}
							]
						},
						help: {validate: false}
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
								{id: 'treenut', name: 'Treenut'},
								{id: 'alcohol', name: 'Alcohol'}
							]
						},
						help: {validate: false}
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
						help: {validate: false}
					}));
					break;
			}
		});

		return React.DOM.form({className: 'fields'}, React.DOM.ul(null, inner));
	}
});