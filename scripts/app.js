import {assign, React, ReactRouter} from './libs';
import base from './app/components/base';
import TransitionGroup from './app/utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, base, {
	displayName: 'App',
	render: function() {
		let path = this.context.router.getCurrentPath();

		return React.DOM.div({id: 'app'},
			React.createElement(TransitionGroup,
				{
					transitionName: 'fade-slow',
					transitionAppear: true
				},
				React.createElement(ReactRouter.RouteHandler, {key: name, path})
			)
		);
	}
}));