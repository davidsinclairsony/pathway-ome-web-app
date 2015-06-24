import {assign, React, ReactRouter} from '../../libs';
import logo from '../components/logo';
import footer from '../components/footer';
import CreateStore from '../stores/create';
import header from '../components/header';
import base from '../components/base';
import details from '../components/details';
import consent from '../components/consent';
import activate from '../components/activate';
import Actions from '../actions';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		isWaiting: CreateStore.get(['isWaiting']),
		currentStep: CreateStore.get(['currentStep'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Create',
	componentDidMount: function() {
		CreateStore.addChangeListener(this._onChange);
	},
	componentDidUpdate: function() {
		// Mainly for back and forward buttons
		Actions.Create.setCurrentStep(this.getCurrentStep());
	},
	componentWillUnmount: function() {
		CreateStore.removeChangeListener(this._onChange);
	},
	getCurrentStep: function() {
		let pathArray = this.props.path.split(/[\s\/]+/);
		let currentStep = pathArray[pathArray.length - 1];

		// Adjust for details
		if(currentStep == 'create') {
			currentStep = 'details';
		}

		return currentStep;
	},
	getInitialState: function() {
		CreateStore.initialize(this.getCurrentStep());
		return getState();
	},
	render: function() {
		// Create progress area
		let progressInner = [];

		let makeProgressItem = props => {
			return React.DOM.li({key: props.key},
				React.DOM.a({
					className: props.classes,
					onClick: props.onClick,
					key: 0
				},
				React.DOM.span({key: 1}, props.name)));
		};

		let progressItems = [
			{
				classes: 'icon-profile',
				step: 'details',
				name: 'Details',
			},
			{
				classes: 'icon-consent',
				step: 'consent',
				name: 'Consent'
			},
			{
				classes: 'icon-activate',
				step: 'activate',
				name: 'Activate'
			}
		];

		let progressIndex;

		progressItems.map((props, index) => {
			// Alter item based on state
			if(typeof(progressIndex) !== 'undefined') {
				props.classes += ' incomplete';
			} else if(props.step == this.state.currentStep) {
				props.classes += ' active';
				progressIndex = index;
			} else {
				props.classes += ' complete';
				props.onClick = () => {
					Actions.Create.goToStep(props.step);
				};
			}

			props.key = index;
			progressInner.push(makeProgressItem(props));
		});

		// Get child component
		let child;

		switch(this.state.currentStep) {
			case 'consent':
				child = consent;
				break;
			case 'activate':
				child = activate;
				break;
			default:
				child = details;
				break;
		}

		// Return wrapped view, wrapping child and header for animations
		return React.DOM.div({className: 'create view'}, [
			React.DOM.div({className: 'wrapper', key: 0}, [
				React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})),
				React.DOM.h2({key: 1}, 'Create an Account'),
				React.DOM.div({key: 2, className: 'progress ' + this.state.currentStep},
					React.DOM.ul({key: 0},
						progressInner
					),
					React.DOM.div({key: 1, className: 'thick line'}, null),
					React.DOM.div({key: 2, className: 'thin line'}, null)
				),
				React.createElement(TransitionGroup,
					{
						transitionName: 'fade-slow-fixed',
						transitionAppear: true,
						component: 'div',
						className: 'inner',
						key: 3
					},
					React.createElement(child, {key: this.props.path})
				)
			]),
			React.createElement(footer, {key: 1})
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));