import {React, TweenMax} from '../../libs';
import logo from '../components/logo';
import create from '../components/create';
import login from '../components/login';
import footer from '../components/footer';
import AuthenticationStore from '../stores/authentication';

// Get state from store
let getState = function() {
	return {
		isPreviousUser: AuthenticationStore.isPreviousUser()
	};
};

export default React.createClass({
	displayName: 'Start',
	mixins: [React.addons.PureRenderMixin],
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
			className: 'start view'
		};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		// Add create component
		inner.push(React.createElement(create, {
			key: 1,
			showExpanded: this.state.isPreviousUser,
			collapsible: true
		}));

		// Add login component
		inner.push(React.createElement(login, {
			key: 2,

		}));

		// Add footer
		inner.push(React.createElement(footer, {key: 3}));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
});