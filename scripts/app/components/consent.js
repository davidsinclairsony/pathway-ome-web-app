import assign from 'object-assign';
import base from './base';
import consent from '../data/consent';
import React from 'react/addons';

export default React.createClass(assign({}, base, {
	displayName: 'Consent',
	render: function() {
		return React.DOM.div({
			dangerouslySetInnerHTML: {__html: consent},
			className: 'component'
		});
	}
}));