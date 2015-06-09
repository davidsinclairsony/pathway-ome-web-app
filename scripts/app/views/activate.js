import {assign, React, TweenMax} from '../../libs';
import logo from '../components/logo';
// import verify from '../components/verify';
import footer from '../components/footer';
import AuthenticationStore from '../stores/authentication';
import base from '../components/base';

// Get state from store
let getState = function() {
	return {

	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Verify',
	getInitialState: function() {
		return getState();
	},
	componentDidMount: function() {
		AuthenticationStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AuthenticationStore.removeChangeListener(this._onChange);
	},
	render: function() {
		let inner = [];
		let props = {
			className: 'verify view'
		};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		inner.push(React.DOM.p({key: 1}, 'Please verify!'));

		// Add footer
		inner.push(React.createElement(footer, {key: 2}));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));