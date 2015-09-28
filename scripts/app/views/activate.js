import Actions from '../actions';
import ActivateStore from '../stores/activate';
import fields from '../components/fields';
import FieldsStore from '../stores/fields';
import footer from '../components/footer';
import Logo from '../components/logo';
import React from 'react/addons';
import {Link} from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		message: ActivateStore.get(['message']),
		showMessage: ActivateStore.get(['showMessage']),
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
		FieldsStore.initialize(['pin']);
		return getState();
	},
	render: function() {
		let inner = [];
		let wrapperInner = [];

		wrapperInner.push(<h1 key={0}><Link to='/'><Logo /></Link></h1>);

		wrapperInner.push(React.DOM.h2({key: 1}, 'Activate Your Device'));

		wrapperInner.push(React.createElement(fields, {
			key: 2,
			fields: this.state.fields,
			submitHandler: this.submitHandler
		}));

		wrapperInner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 3,
			onClick: this.submitHandler,
			id: 'activate'
		}, 'Activate'));

		let transitionInner = [];

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
						onClick: () => {Actions.Activate.changeShowMessage(false);}
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
			key: 4,
			transitionName: 'fade-fast',
			transitionAppear: true
		}, transitionInner));

		inner.push(React.DOM.div({className: 'wrapper', key: 0}, wrapperInner));

		inner.push(React.createElement(footer, {key: 1}));

		return React.DOM.div({className: 'activate view standard thin'}, inner);
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
			Actions.Activate.submit(this.state.fields);
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
});