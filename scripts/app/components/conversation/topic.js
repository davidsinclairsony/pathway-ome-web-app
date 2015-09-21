//import motion from '../data/motion';
import React from 'react/addons';
//import Topic from './conversation/topic';
//import {Spring} from 'react-motion';
import TransitionGroup from '../../utilities/velocityTransitionGroup';

export default React.createClass({
	displayName: 'Topic',
	render: function() {
		let d = this.props.data;
		let mainInner = [];

		if(d.answer.status == 'pending') {
			mainInner.push(
				<div className='pending' key='pending'></div>
			);
		} else {
			console.log(d.answer);
			mainInner.push(
				<div className='summary' key='summary'>
					{d.answer.data.summary}
				</div>
			);
		}

		return (
			<li id={this.props.id}>
				<header>{d.question.question}</header>
				<TransitionGroup
					transitionName='fade-fast'
					transitionAppear={true}
					component='main'
				>
					{mainInner}
				</TransitionGroup>
				<footer>Feedback goes here</footer>
			</li>
		);
	},
	_onChange: function() {
		this.setState(getState());
	}
});