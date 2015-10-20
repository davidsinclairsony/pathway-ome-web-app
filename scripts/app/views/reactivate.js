import Actions from '../actions';
import fields from '../components/fields';
import FieldsStore from '../stores/fields';
import footer from '../components/footer';
import Logo from '../components/logo';
import React from 'react/addons';
import ReactivateStore from '../stores/reactivate';
import {Link} from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';
import base from '../components/base';
import assign from 'object-assign';

let getState = () => {
	return {
		isWaiting: ReactivateStore.get(['isWaiting']),
		fields: FieldsStore.get(['fields'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Reactivate',
	componentDidMount: function() {
		ReactivateStore.addChangeListener(this._onChange);
		FieldsStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		ReactivateStore.removeChangeListener(this._onChange);
		FieldsStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		ReactivateStore.initialize();
		FieldsStore.initialize(['email']);
		return getState();
	},
	render: function() {
		let inner = [];
		let wrapperInner = [];

		wrapperInner.push(<h1 key={0}><Link to='/'><Logo /></Link></h1>);

		wrapperInner.push(React.DOM.h2({key: 1}, 'Reactivate Your Device'));

		wrapperInner.push(React.createElement(fields, {
			key: 2,
			fields: this.state.fields,
			submitHandler: this.submitHandler
		}));

		wrapperInner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 3,
			onClick: this.submitHandler,
			id: 'get-a-pin'
		}, 'Get a Pin'));

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

		return React.DOM.div({className: 'reactivate view standard thin'}, inner);
	},
	submitHandler: function(e) {
		e.preventDefault();

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
			Actions.Reactivate.changeIsWaiting(true);
			console.log('send to api');
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
}));