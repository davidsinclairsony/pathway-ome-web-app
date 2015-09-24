// Credit to https://gist.github.com/tkafka/0d94c6ec94297bb67091

import React from 'react/addons';
import transitions from '../data/transitions';
import Velocity from 'velocity-animate';

let VelocityTransitionGroupChild = React.createClass({
	displayName: 'VelocityTransitionGroupChild',
	propTypes: {transitionName: React.PropTypes.string.isRequired},
	_getTransition: function() {
		if (!transitions[this.props.transitionName]) {
			console.warn(
				'Transition ' + this.props.transitionName + ' not found.'
			);
		}

		return transitions[this.props.transitionName] || transitions.default;
	},
	componentWillEnter: function(done) {
		let node = this.getDOMNode();
		let transition = this._getTransition();

		Velocity(
			node,
			transition.enter,
			{
				duration: transition.duration,
				complete: done
			}
		);
	},
	componentWillLeave: function(done) {
		let node = this.getDOMNode();
		let transition = this._getTransition();

		Velocity(
			node,
			transition.leave,
			{
				duration: transition.duration,
				complete: done
			}
		);
	},
	componentDidLeave: function() {
		if(this.props.didLeave) {
			this.props.didLeave();
		}
	},
	render: function() {
		return React.Children.only(this.props.children);
	}
});

let VelocityTransitionGroup = React.createClass({
	displayName: 'VelocityTransitionGroup',
	propTypes: {transitionName: React.PropTypes.string.isRequired},
	_wrapChild: function(child) {
		return (
			React.createElement(
				VelocityTransitionGroupChild,
				{
					transitionName: this.props.transitionName,
					didLeave: this.props.didLeave
				},
				child
			)
		);
	},
	render: function() {
		return (React.createElement(
			React.addons.TransitionGroup, React.__spread({}, this.props,
				{childFactory: this._wrapChild})
			)
		);
	}
});

export default VelocityTransitionGroup;