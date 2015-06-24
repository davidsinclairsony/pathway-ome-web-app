import {React, ReactRouter, Velocity, assign} from '../../libs';
import Actions from '../actions';
import input from './input';
import base from './base';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, base, {
	displayName: 'Consent',
	submitAction: function(event) {
		event.preventDefault();
	},
	render: function() {
		let inner = [];

		// Add header
		inner.push(React.DOM.h3({key: 0}, 'Please Review the Following'));

		return React.DOM.div({className: 'consent'}, inner);
	}
}));