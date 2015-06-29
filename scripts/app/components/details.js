import {React, ReactRouter, Velocity, assign} from '../../libs';
import Actions from '../actions';
import base from './base';
import DetailsStore from '../stores/details';
import field from './field';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		fields: DetailsStore.get(['fields']),
		isWaiting: DetailsStore.get(['isWaiting'])
	};
};

export default React.createClass(assign({}, {
	componentDidMount: function() {
		DetailsStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		DetailsStore.removeChangeListener(this._onChange);
	},
	displayName: 'Details',
	getInitialState: function() {
		DetailsStore.initialize(this.props.fields);
		return getState();
	},
	submitAction: function(event) {
		event.preventDefault();
	},
	render: function() {
		let inner = [];

		inner.push(React.DOM.h2({key: 0}, this.props.h2));

		// Create list items
		let listInner = [];

		Object.keys(this.state.fields).forEach(key => {
			let help = {
				isValid: this.state.fields[key].isValid,
				help: this.state.fields[key].help,
				showHelp: this.state.fields[key].showHelp,
				validate: this.state.fields[key].validate,
				showIcon: this.state.fields[key].showIcon
			};

			switch(key) {
				case 'name':
					listInner.push(React.createElement(field, {
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
							values: this.state.fields[key].values ?
								this.state.fields[key].values : []
						},
						help
					}));
					break;
				case 'email':
					listInner.push(React.createElement(field, {
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
							values: this.state.fields[key].values ?
								this.state.fields[key].values : []
						},
						help
					}));
					break;
				case 'password':
					listInner.push(React.createElement(field, {
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
							values: this.state.fields[key].values ?
								this.state.fields[key].values : []
						},
						help
					}));
					break;
				case 'dob':
					listInner.push(React.createElement(field, {
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
							values: this.state.fields[key].values ?
								this.state.fields[key].values : []
						},
						help
					}));
					break;
			}
		});

		// Make transition for waiting
		let transitionInner = [];

		if(this.state.isWaiting) {
			transitionInner.push(React.DOM.div({
				key: 0,
				className: 'isWaiting'
			}, null));
		}

		inner.push(React.DOM.form({key: 2},
			React.DOM.ul({key: 0}, listInner),
			React.createElement(TransitionGroup,
				{
					transitionName: 'fade-slow',
					transitionAppear: true
				},
				transitionInner
			)
		));

		return React.DOM.div({className: 'details'}, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));