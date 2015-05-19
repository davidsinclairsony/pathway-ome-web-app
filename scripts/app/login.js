var React = require('./../libs').React;

module.exports = React.createClass({
	displayName: 'Login',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		var inner = [];
		var props = {
			className: 'login'
		};

		// Add h2
		inner.push(React.DOM.h2({key: 0}, 'Log In to an Account'));

		// Add container
		inner.push(React.DOM.form({key: 1}, [
			// Add email input
			React.DOM.input({
				key: 0,
				type: "email",
				placeholder: "Email"
			}),
			React.DOM.input({
				key: 1,
				type: "password",
				placeholder: "Password"
			}),
			React.DOM.input({
				key: 2,
				type: "submit",
				value: "Login",
				className: "button neutral medium"
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