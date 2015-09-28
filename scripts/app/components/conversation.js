import Actions from '../actions';
import ConversationStore from '../stores/conversation';
import Footer from './footer';
import motion from '../data/motion';
import React from 'react/addons';
import Topic from './conversation/topic';
import TransitionGroup from '../utilities/velocityTransitionGroup';
import {Spring} from 'react-motion';

let getState = () => {
	return {
		customQuestion: ConversationStore.get(['customQuestion']),
		isWaiting: ConversationStore.get(['isWaiting']),
		showQuestions: ConversationStore.get(['showQuestions']),
		showRetry: ConversationStore.get(['showRetry']),
		showAskAnother: ConversationStore.get(['showAskAnother']),
		questions: ConversationStore.get(['questions']),
		chat: ConversationStore.get(['chat']),
		chatLength: ConversationStore.get(['chatLength']),
		lastChatStatus: ConversationStore.get(['lastChatStatus']),
		message: ConversationStore.get(['message']),
		showMessage: ConversationStore.get(['showMessage'])
	};
};

export default React.createClass({
	displayName: 'Conversation',
	getInitialState: function() {
		ConversationStore.initialize();
		return getState();
	},
	componentDidMount: function() {
		ConversationStore.addChangeListener(this._onChange);
	},
	componentDidUpdate: function(prevProps, prevState) {
		// Scroll if new chat added or the most recent answer is retrieved
		if(
			(prevState.lastChatStatus != this.state.lastChatStatus) ||
			(prevState.chatLength != this.state.chatLength)
		) {
			let container =
				React.findDOMNode(this).querySelector('.chat .container');
			let latest =
				document.getElementById('chat' + (this.state.chat.length - 1));

			if(latest) {
				let topMargin = window.getComputedStyle(latest).marginTop;
				container.scrollTop =
					latest.offsetTop - parseInt(topMargin.slice(0, -2));
			}
		}
	},
	componentWillUnmount: function() {
		ConversationStore.removeChangeListener(this._onChange);
	},
	render: function() {
		let transitionInner = [];

		let containerInner = [];

		containerInner.push(
			<ul className='questions' key='customQuestions'>
				<li className='custom'>
					<textarea
						value={this.state.customQuestion}
						placeholder='Enter your own question...'
						onChange={e => {
							Actions.Conversation.saveCustom(e.target.value);
						}}
						onKeyUp={e => {
							if(e.keyCode === 13) {
								Actions.Conversation.customSubmit();
							}
						}}
					></textarea>
					<button
						className='button medium positive'
						onClick={() => {Actions.Conversation.customSubmit();}}
						id='ask-ome'
					>Ask OME</button>
				</li>
			</ul>
		);

		containerInner.push(<h2 key='or'>Or select a question...</h2>);

		let questionsInner = [];

		this.state.questions.map(o => {
			questionsInner.push(
				<li
					key={o.questionId}
					onClick={() => {
						Actions.Conversation.ask({
							questionId: o.questionId,
							question: o.questionText
						});
					}}
				>{o.questionText}</li>
			);
		});

		containerInner.push(
			<ul className='questions' key='questions'>{questionsInner}</ul>
		);

		transitionInner.push(
			<Spring
				endValue={{
					val: {height: this.state.showQuestions},
					config: motion.noGames
				}}
				key='panelSpring'
			>
				{i =>
					<div
						className='panel'
						key='panel'
						style={{
							height: `${i.val.height}%`
						}}
					>
						<div className='container' key='container'>
							{containerInner}
						</div>
						<Footer></Footer>
					</div>
				}
			</Spring>
		);

		let topicsInner = [];

		this.state.chat.map(o => {
			topicsInner.push(
				<Topic key={o.id} id={'chat' + o.id} data={o} />
			);
		});

		let button;

		// Add the Ask Another button?
		if(this.state.showAskAnother) {
			button = (
				<button
					key='askAother'
					className='button medium neutral'
					onClick={Actions.Conversation.askAnother}
				>Ask Another Question</button>
			);
		}

		// Add the Retry button?
		if(this.state.showRetry) {
			button = (
				<button
					key='retry'
					className='button medium neutral'
					onClick={Actions.Conversation.retry}
				>Retry</button>
			);
		}

		transitionInner.push(
			<div className='chat' key='chat'>
				<div className='container' key='container'>
					<ul className='topics'>
						{topicsInner}
					</ul>
				</div>
				<footer className='buttons'>
					<TransitionGroup
						transitionName='fade-fast'
						transitionAppear={true}
					>
						{button}
					</TransitionGroup>
				</footer>
			</div>
		);

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
						onClick: () => {
							Actions.Conversation.changeShowMessage(false);
						}
					}, 'Close')
				)
			));
		}

		return React.DOM.section({className: 'conversation'},
			React.createElement(TransitionGroup, {
				key: 'transition',
				className: 'customWrapper',
				transitionName: 'fade-fast',
				transitionAppear: true,
				component: 'div'
			}, transitionInner)
		);
	},
	_onChange: function() {
		this.setState(getState());
	}
});