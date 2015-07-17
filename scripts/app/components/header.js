import Actions from '../actions';
import assign from 'object-assign';
import base from './base';
import logo from './logo';
import React from 'react';
import ReactRouter from 'react-router';
import router from '../router';

export default React.createClass(assign({}, base, {
	displayName: 'Header',
	render: function() {
		let inner = [];

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0},
			React.createElement(ReactRouter.Link, {
				to: 'home',
				activeClassName: 'active'
			},
				React.createElement(logo, {key: 0})
			)
		));

		// Add nav icon
		inner.push(React.DOM.button({
			key: 2,
			className: 'icon-nav',
			onClick: Actions.Home.toggleShowMenu
		}, 'Menu'));

		return React.DOM.header({className: 'global'},
			React.DOM.div({className: 'content'}, inner)
		);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));