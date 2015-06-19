import {assign, React, ReactRouter} from '../../libs';
import header from '../components/header';
import base from '../components/base';
import nav from '../components/nav';
import profile from '../components/profile';
import conversation from '../components/conversation';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';
import HomeStore from '../stores/home';

let getState = () => {
	return {
		showMenu: HomeStore.get(['showMenu'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Home',
	getInitialState: function() {
		// Reset the store
		HomeStore.initialize();

		return getState();
	},
	componentDidMount: function() {
		HomeStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		HomeStore.removeChangeListener(this._onChange);
	},
	componentDidUpdate: function() {
		// Get width of nav
		let navWidth =
			this.getDOMNode().getElementsByTagName('nav')[0].offsetWidth;

		// Get main node
		let main = this.getDOMNode().getElementsByTagName('main')[0];

		// Animate height after update
		if(this.state.showMenu) {
			main.style.overflow = 'hidden';

			Velocity(main, {translateX: -navWidth}, {
				duration: 100,
				easing: 'linear'
			});
		} else {
			Velocity(main, {translateX: 0}, {
				duration: 100,
				easing: 'linear',
				complete: () => {
					main.style.overflow = 'visible';
				}
			});
		}
	},
	render: function() {
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

		// Setup classes for main
		let mainClasses = 'global';

		if(this.state.showMenu) {
			mainClasses += ' show-menu';
		}

		// Return view, wrapping child and header for animations
		return React.DOM.div({className: 'home view'}, [
			React.createElement(nav, {key: 0}),
			React.createElement(TransitionGroup,
				{
					transitionName: 'fade-slow',
					transitionAppear: true,
					component: 'main',
					className: mainClasses,
					key: 1
				},
				[
					React.createElement(header, {key: 0}),
					React.createElement(child, {key: this.props.path}),
				]

			)
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));