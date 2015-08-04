import assign from 'object-assign';
import base from './base';
import React from 'react/addons';

export default React.createClass(assign({}, base, {
	displayName: 'Consent',
	render: function() {
		return React.DOM.div(null, 'Consent content goes here.');
	}
}));