var React = require('./../../libs').React;

module.exports = React.createClass({displayName: 'Button',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		return React.DOM.div(
			{className: 'register'},
			this.props.inner
		);
	}
});