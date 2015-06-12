import {React, ReactRouter, Velocity, assign} from '../../libs';
import Actions from '../actions';
import input from './input';
import base from './base';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, base, {
	displayName: 'Get Activation Link',
	submitAction: function(event) {
		event.preventDefault();

		// Submit if all valid
		if(this.props.isEmailValid) {
			Actions.Activate.submit();
		} else {
			Actions.Activate.validateAll();
		}
	},
	render: function() {
		let inner = [];
		let props = {
			className: 'getActivationLink'
		};

		// Add header
		inner.push(React.DOM.header({key: 0}, [
			React.DOM.h2({key: 0}, 'Activate Your Account'),
			React.DOM.p({key: 1}, [
				'Thanks for creating an account! Check your ',
				'email for a link to activate your account.'
			]),
			React.DOM.p({key: 2}, [
				'Nothing in your inbox? Enter your email ',
				'address and we will send you a new message.'
			])
		]));

		// Create form inner
		let formInner = [];

		// Add email input
		formInner.push(React.createElement(input, {
			key: 0,
			type: 'email',
			placeholder: 'Email',
			shouldValidate: true,
			isValid: this.props.isEmailValid,
			help: this.props.emailHelp,
			value: this.props.emailValue,
			showHelp: this.props.showEmailHelp,
			onChangeCallback: event => {
				Actions.Activate.onFieldChange('email', event.target.value);
			},
			toggleShowHelpCallback: () => {
				Actions.Activate.toggleShowHelp('email');
			}
		}));

		formInner.push(React.DOM.input({
			key: 3,
			type: 'submit',
			value: 'Send an Email',
			className: 'button positive medium',
			onClick: this.submitAction
		}));

		let isWaiting;

		if(this.props.isWaiting) {
			isWaiting = React.DOM.div({
				className: 'waiting'
			});
		}

		formInner.push(React.createElement(TransitionGroup,
			{
				key: 4,
				transitionName: 'fade-fast',
				transitionAppear: true
			},
			isWaiting
		));

		// Add form
		inner.push(React.DOM.form({key: 1}, formInner));

		return React.DOM.div(props, inner);
	}
}));