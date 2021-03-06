import Actions from '../actions';
import LoginStore from '../stores/login';
import fields from '../components/fields';
import FieldsStore from '../stores/fields';
import footer from '../components/footer';
import Logo from '../components/logo';
import React from 'react/addons';
import {Link} from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';
import base from '../components/base';
import assign from 'object-assign';
import immutable from 'seamless-immutable';

let getState = () => {
	return {
		message: LoginStore.get(['message']),
		showMessage: LoginStore.get(['showMessage']),
		isWaiting: LoginStore.get(['isWaiting']),
		fields: immutable(FieldsStore.get(['fields']))
	};
};

export default React.createClass(assign({}, base, {
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

		wrapperInner.push(<h1 key={0}><Link to='/'><Logo /></Link></h1>);

		wrapperInner.push(React.DOM.h2({key: 1}, 'Login'));

		wrapperInner.push(React.createElement(fields, {
			key: 2,
			fields: this.state.fields,
			submitHandler: this.submitHandler
		}));

		wrapperInner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 3,
			onClick: this.submitHandler,
			id: 'login'
		}, 'Login'));

		let transitionInner = [];

		if(this.state.isWaiting) {
			transitionInner.push(React.DOM.div({
				key: 0,
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
						onClick: () => {Actions.Login.changeShowMessage(false);}
					}, 'Close')
				)
			));
		}

		wrapperInner.push(React.createElement(TransitionGroup, {
			key: 4,
			transitionName: 'fade-fast',
			transitionAppear: true
		}, transitionInner));

		wrapperInner.push(React.DOM.p({key: 5},
			'Forgotten password or on a new device? ',
			React.createElement(Link,
				{key: 1, to: '/reactivate'}, 'Click here'
			)
		));

		wrapperInner.push(React.DOM.p({key: 6},
			'Have a pin and need to activate? ',
			React.createElement(Link,
				{key: 1, to: '/activate'}, 'Click here'
			)
		));

		wrapperInner.push(React.DOM.p({key: 7},
			'Need to create an account? ',
			React.createElement(Link,
				{key: 1, to: '/create'}, 'Click here'
			)
		));

		inner.push(React.DOM.div({className: 'wrapper', key: 0}, wrapperInner));

		inner.push(React.createElement(footer, {key: 1}));

		return React.DOM.div({className: 'login view standard thin'}, inner);
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

		if(allValid) {
			Actions.Login.submit(this.state.fields);
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
}));