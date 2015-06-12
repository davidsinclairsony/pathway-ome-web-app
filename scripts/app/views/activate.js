import {assign, React} from '../../libs';
import Actions from '../actions';
import logo from '../components/logo';
import tryToActivate from '../components/tryToActivate';
import getActivationLink from '../components/getActivationLink';
import footer from '../components/footer';
import ActivateStore from '../stores/activate';
import base from '../components/base';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

// Get state from store
let getState = () => {
	return {
		isActivated: ActivateStore.get(['isActivated']),
		isActivating: ActivateStore.get(['isActivating']),
		hasJWT: ActivateStore.get(['hasJWT']),
		isWaiting: ActivateStore.get(['isWaiting']),
		isEmailValid: ActivateStore.get(['fields', 'email', 'isValid']),
		emailHelp: ActivateStore.get(['fields', 'email', 'help']),
		showEmailHelp: ActivateStore.get(['fields', 'email', 'showHelp']),
		emailValue: ActivateStore.get(['fields', 'email', 'value'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Activate',
	getInitialState: function() {
		// Reset store
		ActivateStore.initialize();

		return getState();
	},
	componentDidMount: function() {
		ActivateStore.addChangeListener(this._onChange);

		// Get JWT from url
		if(this.props.params.jwt) {
			Actions.Activate.activate(this.props.params.jwt);
		}
	},
	componentWillUnmount: function() {
		ActivateStore.removeChangeListener(this._onChange);
	},
	render: function() {
		let inner = [];
		let props = {className: 'activate view'};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		// If URL had jwt and tries to activate
		if(this.state.hasJWT) {
			inner.push(React.createElement(tryToActivate, {
				key: 1,
				isActivated: this.state.isActivated,
				isActivating: this.state.isActivating,
				isWaiting: this.state.isWaiting,
				isEmailValid: this.state.isEmailValid,
				emailHelp: this.state.emailHelp,
				showEmailHelp: this.state.showEmailHelp,
				emailValue: this.state.emailValue
			}));
		}

		// If URL did not contain a jwt
		if(!this.state.hasJWT) {
			inner.push(React.createElement(getActivationLink, {
				key: 2,
				isWaiting: this.state.isWaiting,
				isEmailValid: this.state.isEmailValid,
				emailHelp: this.state.emailHelp,
				showEmailHelp: this.state.showEmailHelp,
				emailValue: this.state.emailValue
			}));
		}

		// Add footer
		inner.push(React.createElement(footer, {key: 3}));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));