var React = require('./libs').React;
var start = require('./components/start');

module.exports = React.createClass({displayName: 'App',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		var inner = [];

		// Add intro page
		inner.push(React.createElement(start, {key: 0}));

		return React.DOM.div({className: 'app'}, inner);
	}
});