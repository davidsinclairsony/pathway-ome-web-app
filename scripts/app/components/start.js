var React = require('../../libs').React;
var logo = require('./logo');
var register = require('./register');
var login = require('./login');
var footer = require('./footer');
var Store = require('../store');

var getState = function() {
	return {
		expandRegister: Store.expandRegister(),
		expandLogin: Store.expandLogin()
	};
};

module.exports = React.createClass({
	displayName: 'Start',
	mixins: [React.addons.PureRenderMixin],
	getInitialState: function() {
		return getState();
	},
	componentDidMount: function() {
		Store.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		Store.removeChangeListener(this._onChange);
	},
	render: function() {
		var inner = [];
		var props = {
			className: 'start view'
		};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		// Add register component
		inner.push(React.createElement(register, {
			key: 1,
			showExpanded: this.state.expandRegister
		}));

		// Add login component
		inner.push(React.createElement(login, {
			key: 2,
			showExpanded: this.state.expandLogin
		}));

		// Add footer
		inner.push(React.createElement(footer, {key: 3}));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
});