import {React, ReactRouter, Velocity, assign} from '../../libs';
import Actions from '../actions';
import base from './base';
import field from './fields/field';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, {
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
							placeholders: ['First Name', 'Last Name'],
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
				case 'password':
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
							characterLimiters: [1, 1, 1, 1],
							count: 4,
							htmlType: 'text',
							ids: ['pin1', 'pin2', 'pin3', 'pin4'],
							name: key,
							placeholders: ['1', '2', '3', '4'],
							type: 'textInput',
							values: this.props.fields[key].values ?
								this.props.fields[key].values : []
						},
						help
					}));
					break;
			}
		});

		return React.DOM.form({className: 'fields'}, React.DOM.ul(null, inner));
	}
}));