import {React} from '../../libs';
import Actions from '../actions';
import Authenticator from '../utilities/authenticator';
import Validator from '../utilities/validator';

export default React.createClass({
	displayName: 'Login',
	mixins: [React.addons.PureRenderMixin, React.addons.LinkedStateMixin],
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
	submitAction: function(event) {
		event.preventDefault();

		// Authenticate a user
		Authenticator.login(this.state.email, this.state.password)
			.catch(function(error) {
				console.log('Error logging in', error);
			}
		);
	},
	resetAction: function() {
		Actions.Login.showPasswordReset();
	},
	validate: function(type, value) {
		// If fails validation, set state to trigger render
		if(!validator(type, value)) {
			let validationErrors = this.state.validationErrors;
			validationErrors[type] = true;
			this.setState({validationErrors: validationErrors});

		}
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

		// Add form
		inner.push(React.DOM.form({key: 1,}, [
			React.DOM.div(
				{
					key: 0,
					className: this.state.isEmailValid ? '' : 'invalid'
				},
				[
					React.DOM.input({
						key: 0,
						type: 'email',
						placeholder: 'Email',
						valueLink: this.linkState('email'),
						onBlur: function() {
							// Set state of email validation after switching fields
							self.setState({isEmailValid:
								Validator.isEmailValid(self.state.email)
							});
						}
					}),
					React.DOM.div({
						key: 1,
						className: this.state.isEmailValid ? '' : 'icon-x'
					})
				]
			),
			React.DOM.div(
				{
					key: 1,
					className: this.state.isPasswordValid ? '' : 'invalid'
				},
				[
					React.DOM.input({
						key: 0,
						type: 'password',
						placeholder: 'Password',
						valueLink: this.linkState('password'),
						onBlur: function() {
							// Set state of email validation after switching fields
							self.setState({isPasswordValid:
								Validator.isPasswordValid(self.state.password)
							});
						}
					}),
					React.DOM.div({
						key: 1,
						className: this.state.isPasswordValid ? '' : 'icon-x'
					})
				]
			),
			React.DOM.input({
				key: 2,
				type: 'submit',
				value: 'Login',
				className: 'button neutral medium',
				onClick: this.submitAction
			}),
			React.DOM.p({key: 3}, [
				'Need your password reset? ',
				React.DOM.a({
					key: 4,
					onClick: this.resetAction
				}, 'Click here'),
				'.'
			])
		]));

		// Add link to /email-verification
		inner.push();

		return React.DOM.div(props, inner);
	}
});