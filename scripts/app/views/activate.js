import Actions from '../actions';
import ActivateStore from '../stores/activate';
import fields from '../components/fields';
import FieldsStore from '../stores/fields';
import footer from '../components/footer';
//import header from '../components/header';
import logo from '../components/logo';
import React from 'react/addons';
import ReactRouter from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		isWaiting: ActivateStore.get(['isWaiting']),
		fields: FieldsStore.get(['fields'])
	};
};

export default React.createClass({
	displayName: 'Activate',
	componentDidMount: function() {
		ActivateStore.addChangeListener(this._onChange);
		FieldsStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ActivateStore.removeChangeListener(this._onChange);
		FieldsStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		ActivateStore.initialize();
		FieldsStore.initialize(['email', 'pin']);
		return getState();
	},
	render: function() {
		let inner = [];
		let wrapperInner = [];

		wrapperInner.push(React.DOM.h1({key: 0},
			React.createElement(ReactRouter.Link,
				{key: 1, to: "home"}, React.createElement(logo, null)
			)
		));

		wrapperInner.push(React.DOM.h2({key: 1}, 'Activate Your Device'));

		wrapperInner.push(React.createElement(fields, {
			key: 2,
			fields: this.state.fields
		}));

		wrapperInner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 3,
			onClick: this.submitHandler
		}, 'Activate'));

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

		inner.push(React.DOM.div({className: 'wrapper', key: 0}, wrapperInner));

		inner.push(React.createElement(footer, {key: 1}));

		return React.DOM.div({className: 'activate view standard thin'}, inner);
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
			Actions.Activate.changeIsWaiting(true);
			console.log("send to api");
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
});