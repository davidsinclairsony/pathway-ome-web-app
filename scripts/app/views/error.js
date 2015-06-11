import {assign, React, ReactRouter} from '../../libs';
import router from '../router';
import logo from '../components/logo';
import footer from '../components/footer';
import base from '../components/base';

export default React.createClass(assign({}, base, {
	displayName: 'Error',
	render: function() {
		let inner = [];
		let props = {className: 'error view'};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		// Add create component
		inner.push(React.DOM.p({key: 1},
			'Sorry, there was an error. ',
			React.createElement(ReactRouter.Link,
				{key: 1, to: "home"}, "Click here"
			),
			' to start over.'
		));

		// Add footer
		inner.push(React.createElement(footer, {key: 2}));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));