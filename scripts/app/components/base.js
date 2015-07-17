import React from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default {
	shouldComponentUpdate: shouldPureComponentUpdate,
	contextTypes: {
		router: React.PropTypes.func
	}
};