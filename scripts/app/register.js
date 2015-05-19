var React = require('./../libs').React;

module.exports = React.createClass({
	displayName: 'Register',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		var inner = [];
		var props = {
			className: 'register'
		};

		// Add h2
		inner.push(React.DOM.h2({key: 0}, 'Create an Account'));

		// Add form
		inner.push(React.DOM.form({key: 1}, [
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
				placeholder: 'Repeat Password'
			}),
			React.DOM.input({
				key: 3,
				type: 'submit',
				value: 'Register',
				className: 'button positive medium'
			})
		]));

		// Add link to /email-verification
		inner.push(React.DOM.p({key: 2}, [
			'Need to verify your email address? ',
			React.DOM.a({
				key: 4,
				href: '/email-verification'
			}, 'Click here'),
			'.'
		]));

		return React.DOM.div(props, inner);
	}
});