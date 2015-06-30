import {assign, React, ReactRouter} from '../../libs';
import Actions from '../actions';
import consent from '../components/consent';
import CreateStore from '../stores/create';
import details from '../components/details';
import DetailsStore from '../stores/details';
import footer from '../components/footer';
import header from '../components/header';
import logo from '../components/logo';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		agreedToConsent: CreateStore.get(['agreedToConsent']),
		showConsent: CreateStore.get(['showConsent']),
		isWaiting: CreateStore.get(['isWaiting']),
		detailsFields: DetailsStore.get(['fields'])
	};
};

export default React.createClass(assign({}, {
	displayName: 'Create',
	componentDidMount: function() {
		CreateStore.addChangeListener(this._onChange);
		DetailsStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CreateStore.removeChangeListener(this._onChange);
		DetailsStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		CreateStore.initialize();
		DetailsStore.initialize(['name', 'email', 'password', 'dob']);
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
			fields: this.state.detailsFields,
			isWaiting: this.state.detailsIsWaiting
		}));

		wrapperInner.push(React.DOM.div({className: 'agreement', key: 2},
			React.DOM.input({
				id: 'agreedToConsent',
				type: 'checkbox',
				checked: this.state.agreedToConsent,
				onChange: () => {Actions.Create.changeAgreedToConsent(
					!this.state.agreedToConsent
				);}
			}),
			React.DOM.label(null,
				'I have read and agree to the ',
				React.DOM.a({
					onClick: () => {Actions.Create.changeShowConsent(true);}
				}, 'EULA & Privacy Policy')
			)
		));

		wrapperInner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 3,
			onClick: this.submitHandler
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
						onClick: () => {Actions.Create.changeShowConsent(false);}
					}, 'Close'),
					React.DOM.button({
						className: 'button medium positive',
						onClick: () => {
							Actions.Create.changeAgreedToConsent(true);
							Actions.Create.changeShowConsent(false);
						}
					}, 'I Agree')
				)
			));
		}

		if(this.state.isWaiting) {
			transitionInner.push(React.DOM.div({
				key: 0,
				className: 'waiting'
			}, null));
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
	submitHandler: function() {
		let allValid = true;

		// Validate all fields
		Object.keys(this.state.detailsFields).forEach(key => {
			if(!this.state.detailsFields[key].isValid) {
				allValid = false;
			}
		});

		// Ensure consent is agreed, otherwise show
		if(allValid && !this.state.agreedToConsent) {
			allValid = false;
			Actions.Create.changeShowConsent(true);
		}

		if(allValid) {
			Actions.Create.changeIsWaiting(true);
			console.log("send to api");
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
}));