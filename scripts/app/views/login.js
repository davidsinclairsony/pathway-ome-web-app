import {assign, React, ReactRouter} from '../../libs';
import logo from '../components/logo';
import footer from '../components/footer';
import LoginStore from '../stores/login';
import base from '../components/base';

let getState = () => {
	return {

	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Login',
	componentDidMount: function() {
		LoginStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		LoginStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		LoginStore.initialize();
		return getState();
	},
	render: function() {
		let inner = [];
		let props = {className: 'login view'};

		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		inner.push(React.DOM.div({
			key: 1
		}, 'login'));


		inner.push(React.createElement(ReactRouter.Link, {to: 'create', key: 2}, 'to create'));

		return React.DOM.div(props, [
			React.DOM.div({className: 'wrapper', key: 0}, inner),
			React.createElement(footer, {key: 1})
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));