import {assign, React, ReactRouter} from '../../libs';
import base from './base';
import Actions from '../actions';

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

export default React.createClass(assign({}, base, {
	displayName: 'Nav',
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
						Actions.Home.toggleShowMenu();
						item.onClick(event);
					},
					className
				}, span);
			} else {
				// Conversation link goes to home
				let to = item.name == 'conversation' ? 'home' : item.name;

				link =
					React.createElement(ReactRouter.Link, {
						to,
						className,
						activeClassName: 'active',
						onClick: Actions.Home.toggleShowMenu
					}, span)
				;
			}

			// Push li to inner
			inner.push(React.DOM.li({key: index}, link));
		});

		return React.DOM.nav({className: 'global'}, React.DOM.ul(null, inner));
	}
}));