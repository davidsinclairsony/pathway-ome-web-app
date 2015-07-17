import assign from 'object-assign';
import base from './app/components/base';
import React from 'react';
import ReactRouter from 'react-router';
import TransitionGroup from './app/utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, base, {
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
}));