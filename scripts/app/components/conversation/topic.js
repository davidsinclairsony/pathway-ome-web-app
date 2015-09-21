//import motion from '../data/motion';
import React from 'react/addons';
//import Topic from './conversation/topic';
//import {Spring} from 'react-motion';

export default React.createClass({
	displayName: 'Topic',
	render: function() {
		let d = this.props.data;
		let mainInner;

		if(d.answer.data) {
			console.log(d.answer.data);
		}

		mainInner = 'I have no idea!';

		return (
			<li id={this.props.id}>
				<header>{d.question.question}</header>
				<main>{mainInner}</main>
				<footer>Feedback goes here</footer>
			</li>
		);
	},
	_onChange: function() {
		this.setState(getState());
	}
});