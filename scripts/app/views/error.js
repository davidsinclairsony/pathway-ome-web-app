import assign from 'object-assign';
import base from '../components/base';
import footer from '../components/footer';
import Logo from '../components/logo';
import React from 'react/addons';
import {Link} from 'react-router';

export default React.createClass(assign({}, base, {
	displayName: 'Error',
	render: function() {
		let inner = [];

		inner.push(<h1 key={0}><Link to='/'><Logo /></Link></h1>);

		inner.push(
			<p key={1}>
				Sorry, there was an error. <Link to='/'>Click here</Link>
				{' '} to start over.
			</p>
		);

		return React.DOM.div({className: 'error view standard thin'}, [
			React.DOM.div({className: 'wrapper', key: 0}, inner),
			React.createElement(footer, {key: 1})
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));