import {React, ReactRouter, Velocity, assign} from '../../libs';
import Actions from '../actions';
import input from './input';
import base from './base';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, base, {
	displayName: 'Details',
	submitAction: function(event) {
		event.preventDefault();
	},
	render: function() {
		let inner = [];

		// Add header
		inner.push(React.DOM.h3({key: 0}, 'Please Provide Some Basic Details'));

		// Content
		inner.push(React.DOM.div({key: 1}, 'ii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hiii sd hi'));

		return React.DOM.div({className: 'details'}, inner);
	}
}));