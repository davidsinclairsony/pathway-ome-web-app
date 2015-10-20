import Actions from '../../actions';
import Groceries from './topic/groceries';
import imagesLoaded from 'imagesloaded';
import motion from '../../data/motion';
import Places from './topic/places';
import React from 'react/addons';
import Recipes from './topic/recipes';
import TransitionGroup from '../../utilities/velocityTransitionGroup';
import {Spring} from 'react-motion';
import Watson from './topic/watson';
//import Asker from './topic/asker';
//import immutable from 'seamless-immutable';

let getState = () => {
	return {
		mainHeight: 0,
		footerHeight: 0
	};
};

export default React.createClass({
	displayName: 'Topic',
	getInitialState: function() {
		return getState();
	},
	componentDidMount: function() {
		this.setMainHeight();
		this.setFooterHeight();
	},
	componentDidUpdate: function()  {
		this.setMainHeight();
		this.setFooterHeight();

		let main = React.findDOMNode(this).querySelector('main');
		imagesLoaded(main, this.setMainHeight);

		if(this.props.data.feedback.showComment) {
			this.refs.commentInput.getDOMNode().focus();
		}
	},
	ratingClickHandler: function(event) {
		let rating;

		if(event.target.dataset.rating) {
			rating = event.target.dataset.rating;
		} else {
			rating = event.target.parentElement.dataset.rating;
		}

		Actions.Conversation.updateFeedback(
			this.props.data.id, {rating: parseInt(rating)}
		);
	},
	setMainHeight: function() {
		let main = React.findDOMNode(this).querySelector('main');
		let oldHeight = this.state.mainHeight;

		main.style.height = 'auto';
		let newHeight = main.offsetHeight;
		main.style.height = oldHeight;

		if(oldHeight != newHeight) {
			this.setState({mainHeight: newHeight});
		}
	},
	setFooterHeight: function() {
		let footer = React.findDOMNode(this).querySelector('footer');
		let oldHeight = this.state.footerHeight;

		footer.style.height = 'auto';
		let newHeight = footer.offsetHeight;
		footer.style.height = oldHeight;

		if(oldHeight != newHeight) {
			this.setState({footerHeight: newHeight});
		}
	},
	render: function() {
		let d = this.props.data;
		let mainInner = [];

		if(d.answer.status == 'incomplete') {
			/*mainInner.push(
				<Asker key='asker' data={immutable(d.answer.dataNeeded)} id={d.id} />
			);*/
			mainInner.push(
				<div key='asker' className='summary'>OME requires more information about you to provide an acccurate answer. Please complete your Profile and this answer may be available.</div>
			);
		}

		if(d.answer.data) {
			// All answers have a summary
			mainInner.push(
				<div
					className='summary'
					key='summary'
					dangerouslySetInnerHTML={{__html: d.answer.data.summaryFormatted?
						d.answer.data.summaryFormatted : d.answer.data.summary
					}}
				/>
			);

			let lists = [];

			if(d.answer.data.dataList) {
				d.answer.data.dataList.map(o => {
					switch(o.templateType) {
						case 'recipes':
							lists.push(
								<Recipes key='recipes' data={o.templateData} />
							);
							break;
						case 'places':
							lists.push(<Places key='places' data={o.templateData} />);
							break;
						case 'groceries':
							lists.push(
								<Groceries key='groceries' data={o.templateData} />
							);
						case 'watson':
							lists.push(
								<Watson key='watson' data={o.templateData} />
							);
							break;
					}
				});
			}

			mainInner.push(lists);
		}

		if(d.answer.status == 'pending') {
			mainInner.push(<div className='pending' key='pending'></div>);
		}

		let rating;

		if(d.answer.status == 'complete') {
			let comment;

			if(d.feedback.showComment) {
				comment = (
					<div className='comment' key='comment'>
						<textarea
							ref='commentInput'
							value={d.feedback.comment}
							placeholder='Please leave any comments on the answer here...'
							onChange={e => {
								Actions.Conversation.saveComment(d.id, e.target.value);
							}}
							onKeyUp={e => {
								if(e.keyCode === 13) {
									Actions.Conversation.commentSubmit(d.id);
								}
							}}
						></textarea>
						<button
							className='button small positive'
							id={'commentSave' + d.id}
							onClick={() => {Actions.Conversation.commentSubmit(d.id);}}
						>Save</button>
					</div>
				);
			}
			rating = (
				<TransitionGroup
					transitionName='fade-fast'
					transitionAppear={true}
					component='div'
					className='rating'
					didLeave={() => {this.setFooterHeight();}}
				>
					<div className='top' key='top'>
						Rating
						<ul
							data-rating={d.feedback.rating}
							onClick={this.ratingClickHandler}
						>
							<li title='Negative' className='negative' data-rating='-1'><div /></li>
							<li title='Neutral' className='neutral' data-rating='0'><div /></li>
							<li title='Positive' className='positive' data-rating='1'><div /></li>
						</ul>
						<button
							className='button small neutral'
							id={'commentOpen' + d.id}
							onClick={() => {
								Actions.Conversation.changeShowComment(
									d.id, !d.feedback.showComment
								);
							}}
						>
							Comment
						</button>
					</div>
					{comment}
				</TransitionGroup>
			);
		}

		return (
			<li id={this.props.id} className={d.answer.status}>
				<header>{d.question.question}</header>
				<Spring
					endValue={{
						val: {height: this.state.mainHeight},
						config: motion.noWobble
					}}
				>
					{i => <TransitionGroup
						transitionName='fade-fast'
						transitionAppear={true}
						component='main'
						style={{
							height: `${i.val.height}px`
						}}
					>
						{mainInner}
					</TransitionGroup>}
				</Spring>
				<Spring
					endValue={{
						val: {height: this.state.footerHeight},
						config: motion.noGames
					}}
				>
					{i => <TransitionGroup
						style={{
							height: `${i.val.height}px`
						}}
						transitionName='fade-fast'
						transitionAppear={true}
						component='footer'
					>
						{rating}
					</TransitionGroup>}
				</Spring>
			</li>
		);
	},
	_onChange: function() {
		this.setState(getState());
	}
});