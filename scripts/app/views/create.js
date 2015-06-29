import {assign, React, ReactRouter} from '../../libs';
import Actions from '../actions';
import base from '../components/base';
import consent from '../components/consent';
import CreateStore from '../stores/create';
import details from '../components/details';
import footer from '../components/footer';
import header from '../components/header';
import logo from '../components/logo';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		agreedToConsent: CreateStore.get(['agreedToConsent']),
		showConsent: CreateStore.get(['showConsent'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Create',
	componentDidMount: function() {
		CreateStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CreateStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		CreateStore.initialize();
		return getState();
	},
	render: function() {
		let inner = [];
		let wrapperInner = [];

		wrapperInner.push(React.DOM.h1({key: 0},
			React.createElement(logo, null)
		));

		wrapperInner.push(React.createElement(details, {
			key: 1,
			h2: 'Create an Account',
			fields: ['name', 'email', 'password', 'dob']
		}));

		wrapperInner.push(React.DOM.div({className: 'agreement', key: 2},
			React.DOM.input({
				id: 'agreedToConsent',
				type: 'checkbox',
				checked: this.state.agreedToConsent,
				onChange: Actions.Create.toggleAgreedToConsent
			}),
			React.DOM.label(null,
				'I have read and agree to the ',
				React.DOM.a({
					onClick: Actions.Create.toggleShowConsent
				}, 'EULA & Privacy Policy')
			)
		));

		wrapperInner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 3,
			onClick: () => {console.log('do work yo');}
		}, 'Create'));

		let transitionInner = [];

		if(this.state.showConsent) {
			transitionInner.push(React.DOM.div({
				className: 'modal',
				key: 0
			},
				React.DOM.div({className: 'content'},
					React.createElement(consent, null)
				),
				React.DOM.div({className: 'controls'},
					React.DOM.button({
						className: 'button medium negative',
						onClick: Actions.Create.toggleShowConsent
					}, 'Close'),
					React.DOM.button({
						className: 'button medium positive',
						onClick: () => {
							if(!this.state.agreedToConsent) {
								Actions.Create.toggleAgreedToConsent();
							}

							Actions.Create.toggleShowConsent();
						}
					}, 'I Agree')
				)
			));
		}

		wrapperInner.push(React.createElement(TransitionGroup, {
			key: 4,
			transitionName: 'fade-fast',
			transitionAppear: true
		}, transitionInner));

		inner.push(React.DOM.div({className: 'wrapper', key: 0}, wrapperInner));

		inner.push(React.createElement(footer, {key: 1}));

		return React.DOM.div({className: 'create view'}, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));