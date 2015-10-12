import Actions from '../actions';
import assign from 'object-assign';
import ProfileStore from '../stores/profile';
import fields from './fields';
import FieldsStore from '../stores/fields';
import footer from './footer';
import React from 'react/addons';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';
import Validator from '../utilities/validator';
import User from '../utilities/user';

let getState = () => {
	return {
		isWaiting: ProfileStore.get(['isWaiting']),
		fields: FieldsStore.get(['fields']),
		showForm: ProfileStore.get(['showForm']),
		fetchedHci: ProfileStore.get(['fetchedHci']),
		message: ProfileStore.get(['message']),
		showMessage: ProfileStore.get(['showMessage']),
	};
};

export default React.createClass(assign({}, {
	displayName: 'Profile',
	getInitialState: function() {
		ProfileStore.initialize();
		FieldsStore.initialize([
			'name',
			'email',
			'newPassword',
			'dob',
			'securityQuestion',
			'securityAnswer',
			'nutritionGoal',
			'gender',
			'weight',
			'height',
			'activityLevel',
			'dietType',
			'diabetic',
			'highCholesterol',
			'allergies',
			'diet'
		]);

		return getState();
	},
	closeHandler: function() {
		console.log('close account');
	},
	componentDidMount: function() {
		ProfileStore.addChangeListener(this._onChange);
		FieldsStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ProfileStore.removeChangeListener(this._onChange);
		FieldsStore.removeChangeListener(this._onChange);
	},
	render: function() {
		let transitionInner = [];

		if(this.state.showForm) {
			let loadedInner = [];

			loadedInner.push(React.createElement(fields, {
				key: 'fields',
				fields: this.state.fields,
				submitHandler: this.submitHandler,
				emailBlurHandler: e => {
					let oldEmail = User.get(sessionStorage, 'email');

					if(oldEmail && oldEmail !== e.target.value) {
						Actions.Fields.onEmailBlur();
					}
				}
			}));

			loadedInner.push(React.DOM.div(
				{
					className: 'buttons',
					key: 'buttons'
				},
				React.DOM.button({
					className: 'close button medium negative',
					key: 'close',
					id: 'close',
					onClick: this.closeHandler
				}, 'Close Account'),
				React.DOM.button({
					className: 'submit button medium positive',
					key: 'save',
					id: 'save',
					onClick: this.submitHandler
				}, 'Save')
			 ));

			transitionInner.push(React.DOM.div({
				className: 'loaded',
				key: 'loaded'
			}, loadedInner));
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
						onClick: () => {Actions.Profile.changeShowMessage(false);}
					}, 'Close')
				)
			));
		}

		return React.DOM.section({className: 'profile'},
			React.createElement(TransitionGroup, {
				key: 'transition',
				className: 'wrapper medium',
				transitionName: 'fade-fast',
				transitionAppear: true,
				component: 'div'
			}, transitionInner),
			React.createElement(footer)
		);
	},
	submitHandler: function() {
		let allValid = true;

		// Validate all fields
		Object.keys(this.state.fields).forEach(key => {
			if(
				(
					this.state.fields[key].required ||
					this.state.fields[key].values[0]
				) &&
				!this.state.fields[key].isValid &&
				!Validator.validate(this.state.fields[key])
			) {
				// Set validity in store by sending first value
				Actions.Fields.onFieldChange({
					name: this.state.fields[key].name,
					value: this.state.fields[key].values[0],
					vIndex: 0
				});

				allValid = false;
			}
		});

		if(allValid) {
			Actions.Profile.submit(this.state.fields);
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
}));