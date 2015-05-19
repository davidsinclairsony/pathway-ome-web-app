var React = require('./../libs').React;

module.exports = React.createClass({displayName: 'Button',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		return React.DOM.button(
			{className: this.props.classes},
			this.props.inner
		);
	}
});