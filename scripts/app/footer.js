var React = require('./../libs').React;
var footerData = require('./../data/footer.js');

module.exports = React.createClass({
	displayName: 'Footer',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		return React.DOM.footer(null, React.DOM.p(null, footerData));
	}
});