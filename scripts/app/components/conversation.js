import Actions from '../actions';
import assign from 'object-assign';
import ConversationStore from '../stores/conversation';
import footer from './footer';
import React from 'react/addons';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		isWaiting: ConversationStore.get(['isWaiting']),
		showQuestions: ConversationStore.get(['showQuestions']),
		questions: ConversationStore.get(['questions'])
	};
};

export default React.createClass(assign({}, {
	displayName: 'Conversation',
	getInitialState: function() {
		ConversationStore.initialize();
		return getState();
	},
	componentDidMount: function() {
		ConversationStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ConversationStore.removeChangeListener(this._onChange);
	},
	render: function() {
		let transitionInner = [];

		if(this.state.showQuestions) {
			let questionsInner = [];

			this.state.questions.map(o => {
				questionsInner.push(React.DOM.div(
					{
						key: o.questionId,
						className: 'question'
					},
					React.DOM.span({key: 0}, [
						o.questionText,
						React.DOM.br({key: 1}, null),
						React.DOM.button({
							key: 2,
							className: 'button medium positive'
						}, 'Ask')
					])
				));
			});

			transitionInner.push(React.DOM.div(
				{
					className: 'questions',
					key: 'questions'
				},
				questionsInner
			));
		}

		if(this.state.isWaiting) {
			transitionInner.push(React.DOM.div({
				key: 'waiting',
				className: 'waiting'
			}, null));
		}

		if(this.state.showMessage) {
			transitionInner.push(React.DOM.div({
				className: 'message modal',
				key: 'message'
			},
				React.DOM.div({className: 'content centered'},
					React.DOM.h2(null, this.state.message)
				),
				React.DOM.div({className: 'controls'},
					React.DOM.button({
						className: 'button medium neutral',
						onClick: () => {Actions.Conversation.changeShowMessage(false);}
					}, 'Close')
				)
			));
		}

		return React.DOM.section({className: 'conversation'},
			React.createElement(TransitionGroup, {
				key: 'transition',
				className: 'wrapper',
				transitionName: 'fade-fast',
				transitionAppear: true,
				component: 'div'
			}, transitionInner),
			React.createElement(footer)
		);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));



/*
		// Add a question
		inner.push(React.DOM.div({key: 0, className: 'question'},
			React.DOM.span({key: 0}, [
				'This is the initial and only question people will currently ask.',
				React.DOM.br({key: 1}, null),
				React.DOM.button({
					key: 2,
					className: 'button medium positive'
				}, 'Ask')
			])
		));

		// Add an answer
		inner.push(React.DOM.div({key: 1, className: 'answer'},
			React.DOM.span({key: 0}, [
				'This is a sample response.'
			])
		));

		inner.push(React.DOM.div({key: 2, className: 'answer'},
			React.DOM.span({key: 0}, [
				'This is a sample response. This is a sample response. This is a sample response.'
			])
		));
*/