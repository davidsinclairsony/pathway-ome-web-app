import {React, ReactRouter, Velocity, assign} from '../../libs';
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
	displayName: 'Create',
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

		// Add a question
		inner.push(React.DOM.div({key: 0, className: 'question'},
			React.DOM.span({key: 0}, [
				'This is the initial and only question people will currently ask.',
				React.DOM.br({key: 1}, null),
				React.DOM.button({
					key: 2,
					classes: 'button medium positive'
				}, 'Ask')
			])
		));

		// Add an answer
		inner.push(React.DOM.div({key: 1, className: 'answer'},
			React.DOM.span({key: 0}, [
				'This is a sample response.'
			])
		));

		return React.DOM.section({className: 'conversation'}, [
			React.DOM.div({key: 0, className: 'wrapper'},
				React.DOM.div({className: 'content'}, inner)
			),
			React.createElement(footer, {key: 1})
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));