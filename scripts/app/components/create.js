import {React, TweenMax} from '../../libs';
import Actions from '../actions';
import Validator from '../utilities/validator';

export default React.createClass({
	displayName: 'Create',
	mixins: [React.addons.PureRenderMixin, React.addons.LinkedStateMixin],
	getInitialState: function() {
		// Set initial form height
		let height;

		if(this.props.showExpanded) {
			height = 'auto';
		} else {
			height = 0;
		}

		// Save all initial states
		return {
			formHeight: height,
			showExpanded: this.props.showExpanded,
			email: '',
			password: '',
			repeatPassword: '',
			isEmailValid: this.props.isEmailValid,
			isPasswordValid: this.props.isPasswordValid,
			isRepeatPasswordValid: true
		};
	},
	toggleAction: function() {
		if(this.props.collapsible) {
			this.setState({showExpanded: !this.state.showExpanded});
		}
	},
	createAction: function(event) {
		event.preventDefault();

		// Save verification states and create if fields are valid
		this.setState({
			isEmailValid: Validator.isEmailValid(this.state.email),
			isPasswordValid: Validator.isPasswordValid(this.state.password),
			isRepeatPasswordValid:
				this.state.repeatPassword !== '' &&
				this.state.isPasswordValid &&
				this.state.repeatPassword === this.state.password
		}, function() {
			if(
				this.state.isEmailValid &&
				this.state.isPasswordValid &&
				this.state.isRepeatPasswordValid
			) {
				console.log('subbmited');
			}
		});
	},
	verifyAction: function() {
		console.log('go to verify');
	},
	componentDidMount: function() {
		// Get form's expanded height, reset
		let form = this.getDOMNode().getElementsByTagName('form')[0];
		form.style.height = 'auto';
		let formHeight = form.offsetHeight;
		form.style.height = this.state.formHeight;

		// Save, causing a needless re-render
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
			className: 'create'
		};

		// Add class if collapsible
		if(this.props.collapsible) {
			props.className += ' collapsible';
		}

		// Add h2
		inner.push(React.DOM.h2({
			key: 0,
			onClick: this.toggleAction
		}, 'Create an Account'));

		// Add form
		inner.push(React.DOM.form({key: 1}, [
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
							// Set state of password validation after switching fields
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
			React.DOM.div(
				{
					key: 2,
					className: this.state.isRepeatPasswordValid ? '' : 'invalid'
				},
				[
					React.DOM.input({
						key: 0,
						type: 'password',
						placeholder: 'Repeat Password',
						valueLink: this.linkState('repeatPassword'),
						onBlur: function() {
							// Set state of password validation after switching fields
							self.setState({isRepeatPasswordValid:
								self.state.isPasswordValid &&
								self.state.repeatPassword === self.state.password
							});
						}
					}),
					React.DOM.div({
						key: 1,
						className: this.state.isRepeatPasswordValid ? '' : 'icon-x'
					})
				]
			),
			React.DOM.input({
				key: 3,
				type: 'submit',
				value: 'Create',
				className: 'button positive medium',
				onClick: this.createAction
			})
		]));

		inner.push(React.DOM.p({key: 2}, [
			'Need to verify your email address? ',
			React.DOM.a({
				key: 4,
				onClick: this.verifyAction
			}, 'Click here'),
			'.'
		]));

		return React.DOM.div(props, inner);
	}
});