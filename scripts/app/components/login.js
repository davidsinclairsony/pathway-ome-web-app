import {React, ReactRouter, Velocity, assign} from '../../libs';
import Actions from '../actions';
import Validator from '../utilities/validator';
import input from './input';
import LoginStore from '../stores/login';
import base from './base';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		isWaiting: LoginStore.get(['isWaiting']),
		stayLoggedIn: LoginStore.get(['stayLoggedIn']),
		isEmailValid: LoginStore.get(['fields', 'email', 'isValid']),
		emailHelp: LoginStore.get(['fields', 'email', 'help']),
		showEmailHelp: LoginStore.get(['fields', 'email', 'showHelp']),
		emailValue: LoginStore.get(['fields', 'email', 'value']),
		isPasswordValid: LoginStore.get(['fields', 'password', 'isValid']),
		passwordHelp: LoginStore.get(['fields', 'password', 'help']),
		showPaswordHelp: LoginStore.get(['fields', 'password', 'showHelp']),
		passwordValue: LoginStore.get(['fields', 'password', 'value'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Login',
	getInitialState: function() {
		// Reset the store
		LoginStore.initialize();

		// Set initial form height
		let formHeight;

		if(this.props.showExpanded) {
			formHeight = 'auto';
		} else {
			formHeight = 0;
		}

		return assign({}, getState(), {formHeight});
	},
	componentDidMount: function() {
		LoginStore.addChangeListener(this._onChange);

		// Get form's expanded height, reset
		let form = this.getDOMNode().getElementsByTagName('form')[0];
		form.style.height = 'auto';
		let formHeight = form.offsetHeight + 1;
		form.style.height = this.state.formHeight;

		// Save, causing a needless render
		this.setState({formHeight: formHeight});
	},
	componentWillUnmount: function() {
		LoginStore.removeChangeListener(this._onChange);
	},
	componentDidUpdate: function() {
		// Get form node
		let form = this.getDOMNode().getElementsByTagName('form')[0];

		// Animate height after update
		if(this.props.showExpanded) {
			Velocity(form, {height: this.state.formHeight}, {
				duration: 100,
				easing: 'linear',
				complete: () => {
					form.style.overflow = 'visible';
				}
			});
		} else {
			form.style.overflow = 'hidden';
			Velocity(form, {height: 0}, {
				duration: 100,
				easing: 'linear'
			});
		}
	},
	submitAction: function(event) {
		event.preventDefault();

		// Submit if all valid
		if(
			this.state.isEmailValid &&
			this.state.isPasswordValid
		) {
			Actions.Login.submit();
		} else {
			Actions.Login.validateAll();
		}
	},
	render: function() {
		let inner = [];
		let props = {
			className: 'login'
		};

		// Add class if collapsible for hover effects and pointer
		if(this.props.collapsible) {
			props.className += ' collapsible';
		}

		// Add h2
		inner.push(React.DOM.h2({
			key: 0,
			onClick: () => {
				Actions.Login.hideAllHelp();
				Actions.Start.toggleShowExpanded('login');
			},
		}, 'Log In'));

		// Create form inner
		let formInner = [];

		// Add email input
		formInner.push(React.createElement(input, {
			key: 0,
			type: 'email',
			placeholder: 'Email',
			shouldValidate: true,
			isValid: this.state.isEmailValid,
			help: this.state.emailHelp,
			value: this.state.emailValue,
			showHelp: this.state.showEmailHelp,
			onChangeCallback: event => {
				Actions.Login.onFieldChange('email', event.target.value);
			},
			toggleShowHelpCallback: () => {
				Actions.Login.toggleShowHelp('email');
			}
		}));

		// Add password input
		formInner.push(React.createElement(input, {
			key: 1,
			type: 'password',
			placeholder: 'Password',
			shouldValidate: true,
			isValid: this.state.isPasswordValid,
			help: this.state.passwordHelp,
			showHelp: this.state.showPaswordHelp,
			onChangeCallback: event => {
				Actions.Login.onFieldChange('password', event.target.value);
			},
			toggleShowHelpCallback: () => {
				Actions.Login.toggleShowHelp('password');
			}
		}));

		// Setup for staying logged in
		let checkClasses = 'circle small clickable icon-check switch';

		if(this.state.stayLoggedIn) {
			checkClasses += ' off';
		} else {
			checkClasses += ' on';
		}

		// Add stay logged in input
		formInner.push(React.DOM.div({key: 2, className: 'input stayLoggedIn'}, [
			React.DOM.div({key: 0, className: 'icon-save'}),
			React.DOM.span({key: 1}, 'Stay logged in?'),
			React.DOM.aside({key: 2},
				React.DOM.div({
					key: 2,
					className: checkClasses,
					onClick: Actions.Login.toggleStayLoggedIn
				})
			)
		]));

		// Add submit
		formInner.push(React.DOM.input({
			key: 3,
			type: 'submit',
			value: 'Log In',
			className: 'button neutral medium',
			onClick: this.submitAction
		}));

		// Setup for waiting overlay
		let isWaiting;

		if(this.state.isWaiting) {
			isWaiting = React.DOM.div({className: 'waiting'});
		}

		// Add overlay in transition group
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

		// Add link for verifying email
		inner.push(React.DOM.p({key: 2}, [
			'Need to reset your password? ',
			React.createElement(ReactRouter.Link,
				{key: 1, to: "reset"}, "Click here"
			),
			'.'
		]));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));