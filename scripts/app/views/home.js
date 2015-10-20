import assign from 'object-assign';
import base from '../components/base';
import Conversation from '../components/conversation';
import Header from '../components/header';
import HomeStore from '../stores/home';
import Nav from '../components/nav';
import React from 'react/addons';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';
import WindowStore from '../stores/window';

let getState = () => {
	return {
		showMenu: HomeStore.get(['showMenu']),
		windowWidth: WindowStore.get(['width']),
		windowBps: WindowStore.get(['bps'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Home',
	getInitialState: function() {
		// Reset the stores
		HomeStore.initialize();
		WindowStore.initialize();

		return getState();
	},
	componentDidMount: function() {
		HomeStore.addChangeListener(this._onChange);
		WindowStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		HomeStore.removeChangeListener(this._onChange);
		WindowStore.removeChangeListener(this._onChange);
	},
	componentDidUpdate: function() {
		// Get width of nav
		let navWidth =
			this.getDOMNode().getElementsByTagName('nav')[0].offsetWidth;

		// Get main node
		let main = this.getDOMNode().getElementsByTagName('main')[0];

		// Animate height after update
		if(
			this.state.windowWidth < this.state.windowBps[2] - 1 &&
			this.state.showMenu
		) {
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
		// Wrap child and header for animations
		return (
			<div className='home view wide'>
				<Nav path={this.props.location.pathname} />
				<TransitionGroup
					transitionName='fade-fast'
					transitionAppear={true}
					component='main'
					className='global'
				>
					<Header />
					{this.props.children? this.props.children: <Conversation />}
				</TransitionGroup>
			</div>
		);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));
