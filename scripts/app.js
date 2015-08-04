import React from 'react/addons';
import ReactRouter from 'react-router';
import TransitionGroup from './app/utilities/velocityTransitionGroup.js';

export default React.createClass({
	contextTypes: {router: React.PropTypes.func},
	displayName: 'App',
	render: function() {
		let path = this.context.router.getCurrentPath();
		let key;

		switch(path) {
			case '/profile':
				key = '/';
				break;
			default:
				key = path;
		}

		return React.DOM.div({id: 'app'},
			React.createElement(TransitionGroup, {
				transitionName: 'fade-fast',
				transitionAppear: true
			}, React.createElement(ReactRouter.RouteHandler, {key, path}))
		);
	}
});