import {assign, React, ReactRouter} from '../../libs';
import base from './base';

export default React.createClass(assign({}, base, {
	displayName: 'Footer',
	render: function() {
		let year = new Date().getFullYear();

		return React.DOM.footer({className: 'global'},
			React.DOM.span(null, 'Pathway Genomics ' + year),
			' • ',
			React.createElement(ReactRouter.Link,
				{key: 1, to: "consent"}, "EULA & Privacy Policy"
			)
		);
	}
}));