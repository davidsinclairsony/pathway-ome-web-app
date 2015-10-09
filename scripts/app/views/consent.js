import assign from 'object-assign';
import base from '../components/base';
import consent from '../components/consent';
import footer from '../components/footer';
import Logo from '../components/logo';
import React from 'react';
import {Link} from 'react-router';

export default React.createClass(assign({}, base, {
	displayName: 'Consent',
	render: function() {
		let inner = [];

		inner.push(<h1 key={0}><Link to='/'><Logo /></Link></h1>);

		inner.push(React.DOM.h2({key: 1}, 'Privacy & Terms'));

		inner.push(React.DOM.div({
			key: 2,
			className: 'container'
		},
			React.createElement(consent, null)
		));

		return React.DOM.div({className: 'consent view standard wide'}, [
			React.DOM.div({className: 'wrapper', key: 0}, inner),
			React.createElement(footer, {key: 1})
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));