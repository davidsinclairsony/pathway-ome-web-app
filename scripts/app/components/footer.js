//import Actions from '../actions';
import assign from 'object-assign';
import base from './base';
import React from 'react/addons';
import ReactRouter from 'react-router';

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