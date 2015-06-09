import {assign, React} from '../../libs';
import Actions from '../actions';
import Authenticator from '../utilities/authenticator';
import Help from '../data/help';
import base from './base';

export default React.createClass(assign({}, base, {
	displayName: 'Login',
	getInitialState: function() {
		// Set initial form height
		let height;

		if(this.props.showExpanded) {
			height = 'auto';
		} else {
			height = 0;
		}

		return {
			formHeight: height,
			showExpanded: this.props.showExpanded,
			email: this.props.email,
			password: '',
			isEmailValid: this.props.isEmailValid,
			isPasswordValid: this.props.isPasswordValid
		};
	},
	toggleAction: function() {
		if(this.props.collapsible) {
			this.setState({showExpanded: !this.state.showExpanded});
		}
	},
	loginAction: function(event) {
		event.preventDefault();

		// Authenticate a user
		Authenticator.login(this.state.email, this.state.password)
			.catch(function(error) {
				console.log('Error logging in', error);
			}
		);
	},
	passwordResetAction: function() {
		Actions.Login.showPasswordReset();
	},
	componentDidMount: function() {
		// Get form's expanded height, reset
		let form = this.getDOMNode().getElementsByTagName('form')[0];
		form.style.height = 'auto';
		let formHeight = form.offsetHeight;
		form.style.height = this.state.formHeight;

		// Save, causing a needless render
		this.setState({formHeight: formHeight});
	},
	componentDidUpdate: function() {
		// Get form node
		let form = this.getDOMNode().getElementsByTagName('form')[0];

		// Animate height after update
		if(this.state.showExpanded) {
			TweenMax.to(form, 0.1, {height: this.state.formHeight});
		} else {
			TweenMax.to(form, 0.1, {height: 0});
		}
	},
	render: function() {
		let self = this;
		let inner = [];
		let props = {
			className: 'login'
		};

		// Add class if collapsible
		if(this.props.collapsible) {
			props.className += ' collapsible';
		}

		// Add h2
		inner.push(React.DOM.h2({
			key: 0,
			onClick: this.toggleAction
		}, 'Log In to an Account'));

		// Create form inner
		let formInner = [];

		// Add email
		formInner.push(React.DOM.div(
			{
				key: 0,
				className: this.state.isEmailValid ? '' : 'invalid'
			},
			[
				React.DOM.input({
					key: 0,
					type: 'email',
					placeholder: 'Email',
					valueLink: this.linkState('email')
				}),
				React.DOM.div({
					key: 1,
					className: this.state.isEmailValid ? '' : 'icon-help'
				})
			]
		));

		// Add password
		formInner.push(React.DOM.div(
			{
				key: 1,
				className: this.state.isPasswordValid ? '' : 'invalid'
			},
			[
				React.DOM.input({
					key: 0,
					type: 'password',
					placeholder: 'Password'
				}),
				React.DOM.div({
					key: 1,
					className: this.state.isPasswordValid ? '' : 'icon-help'
				}),
				React.DOM.div({
					key: 2,
					className: 'tip',
				}, Help.invalidPassword)
			]
		));

		// Login area
		formInner.push(React.DOM.footer({key: 2}, [
			React.DOM.div({key: 0}, [
				React.DOM.span({key: 0}, 'Save?'),
				React.DOM.input({
					key: 1,
					type: 'checkbox'
				})
			]),
			React.DOM.input({
				key: 1,
				className: 'button neutral medium',
				type: 'submit',
				value: 'Login',
				onClick: this.loginAction
			})
		]));

		// Add password reset link
		formInner.push(React.DOM.p({key: 3}, [
			'Need your password reset? ',
			React.DOM.a({
				key: 1,
				onClick: this.passwordResetAction
			}, 'Click here'),
			'.'
		]));

		inner.push(React.DOM.form({key: 1}, formInner));

		return React.DOM.div(props, inner);
	}
}));