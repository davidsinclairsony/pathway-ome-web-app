import {React} from '../../libs';

module.exports = React.createClass({
	displayName: 'Footer',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		let year = new Date().getFullYear();

		return React.DOM.footer(null, React.DOM.p(null, 'Pathway Genomics ' + year));
	}
});