import Actions from '../actions';
import consent from '../components/consent';
import CreateStore from '../stores/create';
import fields from '../components/fields';
import FieldsStore from '../stores/fields';
import footer from '../components/footer';
import Logo from '../components/logo';
import React from 'react/addons';
import {Link} from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		agreedToConsent: CreateStore.get(['agreedToConsent']),
		message: CreateStore.get(['message']),
		showConsent: CreateStore.get(['showConsent']),
		showMessage: CreateStore.get(['showMessage']),
		isWaiting: CreateStore.get(['isWaiting']),
		fields: FieldsStore.get(['fields'])
	};
};

export default React.createClass({
	displayName: 'Create',
	componentDidMount: function() {
		CreateStore.addChangeListener(this._onChange);
		FieldsStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CreateStore.removeChangeListener(this._onChange);
		FieldsStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		CreateStore.initialize();
		FieldsStore.initialize(['name', 'email', 'doublePassword', 'dob']);
		return getState();
	},
	render: function() {
		let inner = [];
		let wrapperInner = [];

		wrapperInner.push(<h1 key={0}><Link to='/'><Logo /></Link></h1>);

		wrapperInner.push(React.DOM.h2({key: 1}, 'Create an Account'));

		wrapperInner.push(
			<div key='notice' className='notice'>
				OME is currently an invite-only system while we gather feedback.
				To add yourself to our interest list, please visit
				{' '} <a target='_blank' href='http://www.pathway.com'>
				www.pathway.com</a>.
			</div>
		);

		wrapperInner.push(React.createElement(fields, {
			key: 2,
			fields: this.state.fields,
			submitHandler: this.submitHandler,
			emailBlurHandler: Actions.Fields.onEmailBlur
		}));

		wrapperInner.push(React.DOM.div({className: 'agreement', key: 3},
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
			key: 4,
			onClick: this.submitHandler,
			id: 'create'
		}, 'Create'));

		let transitionInner = [];

		if(this.state.showConsent) {
			transitionInner.push(React.DOM.div({
				className: 'consentPopup modal',
				key: 'consentPopup'
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
						onClick: () => {Actions.Create.changeShowMessage(false);}
					}, 'Close')
				)
			));
		}

		if(this.state.isWaiting) {
			transitionInner.push(React.DOM.div({
				key: 'waiting',
				className: 'waiting'
			}, null));
		}

		wrapperInner.push(React.createElement(TransitionGroup, {
			key: 5,
			transitionName: 'fade-fast',
			transitionAppear: true
		}, transitionInner));

		wrapperInner.push(React.DOM.p({key: 7},
			'Have a pin and need to activate? ',
			React.createElement(Link,
				{key: 1, to: '/activate'}, 'Click here'
			)
		));

		wrapperInner.push(React.DOM.p({key: 8},
			'Need to login? ',
			React.createElement(Link,
				{key: 1, to: '/login'}, 'Click here'
			)
		));

		inner.push(React.DOM.div({className: 'wrapper', key: 0}, wrapperInner));

		inner.push(React.createElement(footer, {key: 1}));

		return React.DOM.div({className: 'create view standard medium'}, inner);
	},
	submitHandler: function(e) {
		e.preventDefault();

		let allValid = true;

		// Validate all fields
		Object.keys(this.state.fields).forEach(key => {
			if(!this.state.fields[key].isValid) {
				Actions.Fields.onFieldChange({
					name: this.state.fields[key].name,
					value: this.state.fields[key].values[0],
					vIndex: 0
				});

				allValid = false;
			}
		});

		// Ensure consent is agreed, otherwise show
		if(allValid && !this.state.agreedToConsent) {
			allValid = false;
			Actions.Create.changeShowConsent(true);
		}

		if(allValid) {
			Actions.Create.submit(this.state.fields);
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
});