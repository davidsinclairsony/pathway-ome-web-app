import {React, ReactRouter} from './libs';

export default React.createClass({
	displayName: 'App',
	render: function() {
		var dt = new Date();
var secs = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
		console.log(ReactRouter.RouteHandler);
		return React.DOM.div({id: 'app'},
			React.createElement(React.addons.CSSTransitionGroup,
				{
					transitionName: 'example',
					transitionAppear: true
				},
				React.createElement(ReactRouter.RouteHandler, {key: secs})
			)
		);
	}
});