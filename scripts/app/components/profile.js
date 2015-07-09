import {assign, React, ReactRouter, Velocity} from '../../libs';
import Actions from '../actions';
//import CreateStore from '../stores/create';
import base from './base';
import footer from './footer';
//import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {

	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Profile',
	getInitialState: function() {
		// Reset the store
		//CreateStore.initialize();

		return getState();
	},
	componentDidMount: function() {
		//CreateStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		//CreateStore.removeChangeListener(this._onChange);
	},
	render: function() {
		let inner = [];

		// Add form
		inner.push(React.DOM.p({key: 0}, 'Profile goes here'));

		return React.DOM.section({className: 'profile'}, [
			React.DOM.div({key: 0, className: 'wrapper'}, inner),
			React.createElement(footer, {key: 1})
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));