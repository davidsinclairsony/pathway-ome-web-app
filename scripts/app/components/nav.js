import Actions from '../actions';
import assign from 'object-assign';
import base from './base';
import React from 'react';
import ReactRouter from 'react-router';
import WindowStore from '../stores/window';

// Map navigation
let navItems = [
	{name: 'conversation'},
	{name: 'profile'},
	{
		name: 'logout',
		onClick: (event) => {
			event.preventDefault();
			console.log('log it out, son!!!');
		}
	}
];

let getState = () => {
	return {
		windowWidth: WindowStore.get(['width']),
		windowBps: WindowStore.get(['bps'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Nav',
	componentDidMount: function() {
		WindowStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		WindowStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		WindowStore.initialize();
		return getState();
	},
	render: function() {
		let inner = [];

		navItems.map((item, index) => {
			let link;
			let span = React.DOM.span(null, item.name);
			let className = 'icon-' + item.name;

			// Output certain type of link
			if(item.onClick) {
				link = React.DOM.a({
					onClick: event => {
						if(this.state.windowWidth < this.state.windowBps[2]) {
							Actions.Home.toggleShowMenu();
						}

						item.onClick(event);
					},
					className
				}, span);
			} else {
				// Conversation link goes to home
				let to = item.name == 'conversation' ? 'home' : item.name;

				link = React.createElement(ReactRouter.Link, {
					to,
					className,
					activeClassName: 'active',
					onClick: () => {
						if(this.state.windowWidth < this.state.windowBps[2]) {
							Actions.Home.toggleShowMenu();
						}
					}
				}, span);
			}

			// Push li to inner
			inner.push(React.DOM.li({key: index}, link));
		});

		return React.DOM.nav({className: 'global'}, React.DOM.ul(null, inner));
	},
	_onChange: function() {
		this.setState(getState());
	}
}));