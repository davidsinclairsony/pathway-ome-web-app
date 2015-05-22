var React = require('../../libs').React;
var TweenMax = require('../../libs').TweenMax;
var Actions = require('../actions');

module.exports = React.createClass({
	displayName: 'Register',
	mixins: [React.addons.PureRenderMixin],
	getInitialState: function() {
		// Set initial form height
		var height;

		if(this.props.showExpanded) {
			height = 'auto';
		} else {
			height = 0;
		}

		return {
			formHeight: height
		};
	},
	toggleAction: function() {
		Actions.toggleExpandRegister();
	},
	submitAction: function() {
		Actions.submitRegister();
	},
	verifyAction: function() {
		Actions.showVerification();
	},
	componentDidMount: function() {
		// Get form's expanded height, reset
		var form = this.getDOMNode().getElementsByTagName('form')[0];
		form.style.height = 'auto';
		var formHeight = form.offsetHeight;
		form.style.height = this.state.formHeight;

		// Save, causing a needless render
		this.setState({formHeight: formHeight});
	},
	componentDidUpdate: function() {
		// Get form node
		var form = this.getDOMNode().getElementsByTagName('form')[0];

		// Animate height after update
		if(this.props.showExpanded) {
			TweenMax.to(form, 0.1, {height: this.state.formHeight});
		} else {
			TweenMax.to(form, 0.1, {height: 0});
		}
	},
	render: function() {
		var inner = [];
		var props = {
			className: 'register'
		};

		// Add h2
		inner.push(React.DOM.h2({
			key: 0,
			onClick: this.toggleAction
		}, 'Create an Account'));

		// Add form if state allows
		inner.push(React.DOM.form({key: 1,}, [
			React.DOM.input({
				key: 0,
				type: 'email',
				placeholder: 'Email'
			}),
			React.DOM.input({
				key: 1,
				type: 'password',
				placeholder: 'Password'
			}),
			React.DOM.input({
				key: 2,
				type: 'password',
				placeholder: 'Repeat Password',
				onClick: this.submitAction
			}),
			React.DOM.input({
				key: 3,
				type: 'submit',
				value: 'Register',
				className: 'button positive medium'
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