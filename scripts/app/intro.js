var React = require('./../libs').React;
var register = require('./intro/register');

module.exports = React.createClass({displayName: 'Intro',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		var inner = [];
		var props = {
			className: 'intro view'
		}

		// Add register component
		inner.push(React.createElement(register, {key: 0}));

		return React.DOM.div(props, inner);
	}
});