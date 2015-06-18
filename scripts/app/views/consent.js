import {assign, React, ReactRouter} from '../../libs';
import logo from '../components/logo';
import footer from '../components/footer';
import base from '../components/base';

export default React.createClass(assign({}, base, {
	displayName: 'Consent',
	render: function() {
		let inner = [];
		let props = {className: 'consent view'};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		// Add consent
		inner.push(React.DOM.p({key: 1},
			'Consent'
		));

		// Wrap for sticky footer purposes
		return React.DOM.div(props, [
			React.DOM.div({className: 'wrapper', key: 0}, inner),
			React.createElement(footer, {key: 1})
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));