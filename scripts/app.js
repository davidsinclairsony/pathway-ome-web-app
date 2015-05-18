var React = require('./libs').React;

module.exports = React.createClass({displayName: 'List Item',
	render: function() {
		return React.DOM.div({id: 'app'}, [
			'Hello'
		]);
	}
});