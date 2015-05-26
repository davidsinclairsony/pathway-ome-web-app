var React = require('./libs').React;
var start = require('./app/components/start');
var Store = require('./app/store');

module.exports = React.createClass({displayName: 'App',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		var inner = [];

		// Add intro page
		inner.push(React.createElement(start, {
			key: 0,
			isPreviousUser: Store.isPreviousUser()
		}));

		return React.DOM.div({className: 'app'}, inner);
	}
});