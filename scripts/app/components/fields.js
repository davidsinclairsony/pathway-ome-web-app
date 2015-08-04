import Actions from '../actions';
import assign from 'object-assign';
import base from './base';
import field from './fields/field';
import React from 'react/addons';
import ReactRouter from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';
import Velocity from 'velocity-animate';

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
							placeholders: ['#', '#', '#', '#'],
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
			}
		});

		return React.DOM.form({className: 'fields'}, React.DOM.ul(null, inner));
	}
});