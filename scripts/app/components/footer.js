import {React} from '../../libs';

export default React.createClass({
	displayName: 'Footer',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		let year = new Date().getFullYear();

		return React.DOM.footer({className: 'global'},
			React.DOM.p(null, 'Pathway Genomics ' + year)
		);
	}
});