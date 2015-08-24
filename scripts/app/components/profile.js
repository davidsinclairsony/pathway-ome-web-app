import Actions from '../actions';
import assign from 'object-assign';
import ProfileStore from '../stores/profile';
import fields from './fields';
import FieldsStore from '../stores/fields';
import footer from './footer';
import React from 'react/addons';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		isWaiting: ProfileStore.get(['isWaiting']),
		fields: FieldsStore.get(['fields']),
		showForm: ProfileStore.get(['showForm']),
		fetchedHci: ProfileStore.get(['fetchedHci'])
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
		console.log("close account");
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
				fields: this.state.fields
			}));

			loadedInner.push(React.DOM.div(
				{
					className: 'buttons',
					key: 'buttons'
				},
				React.DOM.button({
					className: 'close button medium negative',
					key: 'close',
					onClick: this.closeHandler
				}, 'Close Account'),
				React.DOM.button({
					className: 'submit button medium positive',
					key: 'save',
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
console.log(this.state.fields);
		// Validate all fields
		Object.keys(this.state.fields).forEach(key => {
			if(
				this.state.fields[key].validate &&
				!this.state.fields[key].isValid
			) {
				Actions.Fields.onFieldChange({
					name: this.state.fields[key].name,
					value: this.state.fields[key].value,
					vIndex: 0
				});

				allValid = false;
			}
		});

		if(allValid) {
			//Actions.Create.submit(this.state.fields);
			console.log("all valid");
		} else {
			console.log("not valid");
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
}));