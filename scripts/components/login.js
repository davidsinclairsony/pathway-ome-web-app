var React = require('./../libs').React;
var TweenMax = require('./../libs').TweenMax;

module.exports = React.createClass({
	displayName: 'Login',
	mixins: [React.addons.PureRenderMixin],
	getInitialState: function() {
		return {
			formHeight: 0
		};
	},
	toggleForm: function() {
		this.setState({shouldExpandForm: !this.state.shouldExpandForm});
	},
	componentDidMount: function() {
		// Get form's expanded height, reset, save
		var form = this.getDOMNode().getElementsByTagName('form')[0];
		form.style.height = 'auto';
		var formHeight = form.offsetHeight;
		form.style.height = '0';

		this.setState({formHeight: formHeight});
	},
	componentDidUpdate: function() {
		// Get form node
		var form = this.getDOMNode().getElementsByTagName('form')[0];

		// Animate height after update
		if(this.props.shouldExpandForm) {
			TweenMax.to(form, .1, {height: this.state.formHeight});
		} else {
			TweenMax.to(form, .1, {height: 0});
		}
	},
	render: function() {
		var inner = [];
		var props = {
			className: 'login'
		};

		// Add h2
		inner.push(React.DOM.h2({
			key: 0,
			onClick: this.toggleForm
		}, 'Log In to an Account'));

		// Add form
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
				type: 'submit',
				value: 'Login',
				className: 'button neutral medium'
			}),
			React.DOM.p({key: 3}, [
				'Need your password reset? ',
				React.DOM.a({
					key: 4,
					href: '/password-reset'
				}, 'Click here'),
				'.'
			])
		]));

		// Add link to /email-verification
		inner.push();

		return React.DOM.div(props, inner);
	}
});