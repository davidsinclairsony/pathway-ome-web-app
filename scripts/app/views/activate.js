import {assign, React} from '../../libs';
import logo from '../components/logo';
import getActivationLink from '../components/getActivationLink';
import footer from '../components/footer';
import ActivateStore from '../stores/activate';
import base from '../components/base';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

// Get state from store
let getState = () => {
	return {

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
	},
	componentWillUnmount: function() {
		ActivateStore.removeChangeListener(this._onChange);
	},
	render: function() {
		let inner = [];
		let props = {className: 'activate view'};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		// Dyanmic area
		let dynamicInner = [];

		// Add needs getActivationLink component if needed
		if(true) {
			dynamicInner.push(React.createElement(getActivationLink, {key: 0}));
		}

		inner.push(React.createElement(TransitionGroup,
			{
				key: 2,
				transitionName: 'fade-fast',
				transitionAppear: true
			},
			dynamicInner
		));

		// Add footer
		inner.push(React.createElement(footer, {key: 3}));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));