import {assign, React, ReactRouter} from '../../libs';
import header from '../components/header';
import base from '../components/base';
import nav from '../components/nav';
import profile from '../components/profile';
import conversation from '../components/conversation';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, base, {
	displayName: 'Home',
	render: function() {
		let inner = [];

		// Add header
		inner.push(React.createElement(header, {key: 0}));

		// Add nav
		inner.push(React.createElement(nav, {key: 1}));

		// Get child component
		let child;

		switch(this.props.path) {
			case '/':
				child = conversation;
				break;
			case '/profile':
				child = profile;
				break;
			default:
				child = null;
				break;
		}

		// Add child component
		inner.push(React.createElement(TransitionGroup,
			{
				transitionName: 'fade-slow',
				transitionAppear: true,
				key: 2
			},
			React.createElement(child, {key: this.props.path})
		));

		return React.DOM.div({className: 'home view'}, inner);
	}
}));