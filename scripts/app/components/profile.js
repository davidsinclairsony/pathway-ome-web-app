import Actions from '../actions';
import assign from 'object-assign';
import base from './base';
//import CreateStore from '../stores/create';
import footer from './footer';
import React from 'react/addons';
import ReactRouter from 'react-router';
//import TransitionGroup from '../utilities/velocityTransitionGroup.js';
import Velocity from 'velocity-animate';

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