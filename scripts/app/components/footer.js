import {assign, React} from '../../libs';
import base from './base';

export default React.createClass(assign({}, base, {
	displayName: 'Footer',
	render: function() {
		let year = new Date().getFullYear();

		return React.DOM.footer({className: 'global'},
			React.DOM.p(null, 'Pathway Genomics ' + year)
		);
	}
}));