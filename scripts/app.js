import {React, ReactRouter} from './libs';
import start from './app/views/verify';
import BaseStore from './app/stores/base';

export default React.createClass({displayName: 'App',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		return React.DOM.div(
			{className: 'app'},
			React.createElement(ReactRouter.RouteHandler, null)
		);
	}
});