import {React, ReactRouter} from '../../libs';
import Actions from '../actions';
import fields from '../components/fields';
import FieldsStore from '../stores/fields';
import footer from '../components/footer';
import header from '../components/header';
import ReactivateStore from '../stores/reactivate';
import logo from '../components/logo';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';

let getState = () => {
	return {
		isWaiting: ReactivateStore.get(['isWaiting']),
		fields: FieldsStore.get(['fields'])
	};
};

export default React.createClass({
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

		wrapperInner.push(React.DOM.h1({key: 0},
			React.createElement(ReactRouter.Link,
				{key: 1, to: "home"}, React.createElement(logo, null)
			)
		));

		wrapperInner.push(React.DOM.h2({key: 1}, 'Reactivate Your Device'));

		wrapperInner.push(React.createElement(fields, {
			key: 2,
			fields: this.state.fields
		}));

		wrapperInner.push(React.DOM.button({
			className: 'submit button medium positive',
			key: 3,
			onClick: this.submitHandler
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
			Actions.Reactivate.changeIsWaiting(true);
			console.log("send to api");
		}
	},
	_onChange: function() {
		this.setState(getState());
	}
});