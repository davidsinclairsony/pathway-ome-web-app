var React = require('./libs').React;
var intro = require('./app/intro');

module.exports = React.createClass({displayName: 'App',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		var inner = [];

		// Add intro page
		inner.push(React.createElement(intro, {key: 0}));

		return React.DOM.div({className: 'app'}, inner);
	}
});