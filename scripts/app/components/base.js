import React from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default {
	contextTypes: {router: React.PropTypes.func},
	shouldComponentUpdate: shouldPureComponentUpdate
};