import Actions from '../actions';
import LoginStore from '../stores/login';
import fields from '../components/fields';
import FieldsStore from '../stores/fields';
import footer from '../components/footer';
import logo from '../components/logo';
import React from 'react/addons';
import ReactRouter from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		message: LoginStore.get(['message']),
		showMessage: LoginStore.get(['showMessage']),
		isWaiting: LoginStore.get(['isWaiting']),
		fields: FieldsStore.get(['fields'])
	};
};

export default React.createClass({
	displayName: 'Login',
	componentDidMount: function() {
		LoginStore.addChangeListener(this._onChange);
		FieldsStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		LoginStore.removeChangeListener(this._onChange);
		FieldsStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		LoginStore.initialize();
		FieldsStore.initialize(['email', 'singlePassword']);
		return getState();
	},
	render: function() {
		let inner = [];
		let wrapperInner = [];

		wrapperInner.push(React.DOM.h1({key: 0},
			React.createElement(ReactRouter.Link,
				{key: 1, to: 'home'}, React.createElement(logo, null)
			)
		));

		wrapperInner.push(React.DOM.h2({key: 1}, 'Login'));

		wrapperInner.push(React.createElement(fields, {
			key: 2,
			fields: this.state.fields,
			submitHandler: this.submitHandler
		}));

		wrapperInner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 3,
			onClick: this.submitHandler
		}, 'Login'));

		let transitionInner = [];

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

		wrapperInner.push(React.DOM.p({key: 5},
			'Forgotten password or on a new device? ',
			React.createElement(ReactRouter.Link,
				{key: 1, to: 'reactivate'}, 'Click here'
			)
		));

		wrapperInner.push(React.DOM.p({key: 6},
			'Have a pin and need to activate? ',
			React.createElement(ReactRouter.Link,
				{key: 1, to: 'activate'}, 'Click here'
			)
		));

		wrapperInner.push(React.DOM.p({key: 7},
			'Need to create an account? ',
			React.createElement(ReactRouter.Link,
				{key: 1, to: 'create'}, 'Click here'
			)
		));

		inner.push(React.DOM.div({className: 'wrapper', key: 0}, wrapperInner));

		inner.push(React.createElement(footer, {key: 1}));

		return React.DOM.div({className: 'login view standard thin'}, inner);
	},
	submitHandler: function() {
		let allValid = true;

		// Validate all fields
		Object.keys(this.state.fields).forEach(key => {
			if(!this.state.fields[key].isValid) {
				Actions.Fields.onFieldChange({
					name: this.state.fields[key].name,
					value: this.state.fields[key].value,
					vIndex: 0
				});

				allValid = false;
			}
		});

		if(allValid) {
			Actions.Login.submit(this.state.fields);
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
});