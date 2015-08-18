//import Actions from '../actions';
import assign from 'object-assign';
import ProfileStore from '../stores/profile';
import fields from './fields';
import FieldsStore from '../stores/fields';
import footer from './footer';
import React from 'react/addons';
//import ReactRouter from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';
//import Velocity from 'velocity-animate';

let getState = () => {
	return {
		isWaiting: ProfileStore.get(['isWaiting']),
		fields: FieldsStore.get(['fields'])
	};
};

export default React.createClass(assign({}, {
	displayName: 'Profile',
	getInitialState: function() {
		ProfileStore.initialize();
		FieldsStore.initialize([
			'name',
			'email',
			'doublePassword',
			'dob',
			'securityQuestion',
			'securityAnswer',
			'nutritionGoal',
			'gender',
			'height',
			'activityLevel',
			'dietType',
			'diabetic',
			'highCholesterol',
			'allergies'
		]);
		return getState();
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
		let inner = [];

		inner.push(React.createElement(fields, {
			key: 'fields',
			fields: this.state.fields
		}));

		inner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 'save',
			onClick: this.submitHandler
		}, 'Save'));

		if(this.state.isWaiting) {
			let transitionInner = [];

			transitionInner.push(React.DOM.div({
				key: 1,
				className: 'waiting'
			}, null));

			inner.push(React.createElement(TransitionGroup, {
				key: 5,
				transitionName: 'fade-fast',
				transitionAppear: true
			}, transitionInner));
		}

		return React.DOM.section({className: 'profile'},
			React.DOM.div({className: 'wrapper medium'}, inner),
			React.createElement(footer)
		);
	},
	submitHandler: function() {
		let allValid = true;

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
}));