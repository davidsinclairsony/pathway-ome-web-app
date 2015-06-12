import {React, ReactRouter, Velocity, assign} from '../../libs';
import router from '../router';
import Actions from '../actions';
import input from './input';
import base from './base';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, base, {
	displayName: 'Try To Activate',
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
			className: 'tryToActivate'
		};

		// Display header message
		let headerInner = [];

		if(this.props.isActivating) {
			headerInner.push(React.DOM.h2({key: 0}, 'Activating...'));
		} else {
			if(this.props.isActivated) {
				headerInner.push(React.DOM.h2({key: 1}, 'Activation Successful'));
			} else {
				headerInner.push(React.DOM.h2({key: 2}, 'Activation Error'));
				headerInner.push(React.DOM.p({key: 3}, [
					'Sorry, there was an error activating your account. Please ',
					'enter your email address to recieve a new activate link.'
				]));
			}
		}

		inner.push(React.DOM.header({key: 0}, headerInner));

		// For either form or loading icon
		let mainInner = [];

		if(this.props.isActivating) {
			// Show waiting
			mainInner.push(React.DOM.div({
				key: 0,
				className: 'waiting'
			}, null));
		} else {
			// Create form inner
			let formInner = [];

			if(this.props.isActivated) {
				// Add success button
				formInner.push(React.DOM.input({
					key: 3,
					type: 'submit',
					value: 'Go To Login',
					className: 'button neutral medium',
					onClick: event => {
						event.preventDefault();
						router.transitionTo('start');
					}
				}));
			} else {
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
			}

			// Add form
			mainInner.push(React.DOM.form({key: 2}, formInner));
		}

		inner.push(React.DOM.main({key: 1}, mainInner));

		return React.DOM.div(props, inner);
	}
}));