import {React, ReactRouter, TweenMax} from '../../libs';
import Actions from '../actions';
import Validator from '../utilities/validator';
import Help from '../data/help';
import input from './input';
import CreateStore from '../stores/create';

let getState = () => {
	return {
		isWaiting: CreateStore.isWaiting(),
		isEmailValid: CreateStore.isValid('email'),
		emailHelp: CreateStore.getHelp('email'),
		shouldShowEmailHelp: CreateStore.shouldShowHelp('email'),
		emailValue: CreateStore.getValue('email'),
		isPasswordValid: CreateStore.isValid('password'),
		passwordHelp: CreateStore.getHelp('password'),
		shouldShowPaswordHelp: CreateStore.shouldShowHelp('password'),
		passwordValue: CreateStore.getValue('password'),
		isRepeatPasswordValid: CreateStore.isValid('repeatPassword'),
		repeatPasswordHelp: CreateStore.getHelp('repeatPassword'),
		shouldShowRepeatPaswordHelp: CreateStore.shouldShowHelp('repeatPassword'),
		repeatPasswordValue: CreateStore.getValue('repeatPassword'),
	};
};

export default React.createClass({
	displayName: 'Create',
	mixins: [React.addons.PureRenderMixin, React.addons.LinkedStateMixin],
	getInitialState: function() {
		// Get states from store
		let state = getState();

		// Add in states from props
		state.showExpanded = this.props.showExpanded;

		return state;
	},
	componentDidMount: function() {
		CreateStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		CreateStore.removeChangeListener(this._onChange);
	},
	toggleAction: function() {
		if(this.props.collapsible) {
			this.setState({showExpanded: !this.state.showExpanded});
		}
	},
	submitAction: function(event) {
		event.preventDefault();

		// Submit if all valid
		if(
			this.state.isEmailValid &&
			this.state.isPasswordValid &&
			this.state.isRepeatPasswordValid
		) {
			Actions.Create.submit();
		} else {
			Actions.Create.validateAll();
		}
	},
	render: function() {
		let inner = [];
		let props = {
			className: 'create'
		};

		// Add class if collapsible
		if(this.props.collapsible) {
			props.className += ' collapsible';
		}

		// Add h2
		inner.push(React.DOM.h2({
			key: 0,
			onClick: this.toggleAction
		}, 'Create an Account'));

		// Create form inner
		let formInner = [];

		// Add email input
		let emailInput;

		emailInput = React.createElement(input, {
			key: 0,
			type: 'email',
			placeholder: 'Email',
			shouldValidate: true,
			isValid: this.state.isEmailValid,
			help: this.state.emailHelp,
			value: this.state.emailValue,
			shouldShowHelp: this.state.shouldShowEmailHelp,
			onChangeCallback: event => {
				Actions.Create.validateField('email', event.target.value);
			},
			toggleShowHelpCallback: () => {
				Actions.Create.toggleShowHelp('email');
			}
		});

		formInner.push(emailInput);

		// Add password input
		formInner.push(React.createElement(input, {
			key: 1,
			type: 'password',
			placeholder: 'Password',
			shouldValidate: true,
			isValid: this.state.isPasswordValid,
			help: this.state.passwordHelp,
			shouldShowHelp: this.state.shouldShowPaswordHelp,
			onChangeCallback: event => {
				Actions.Create.validateField('password', event.target.value);
			},
			toggleShowHelpCallback: () => {
				Actions.Create.toggleShowHelp('password');
			}
		}));

		// Add repeat password input
		formInner.push(React.createElement(input, {
			key: 2,
			type: 'password',
			placeholder: 'Repeat Password',
			shouldValidate: true,
			isValid: this.state.isRepeatPasswordValid,
			help: this.state.repeatPasswordHelp,
			shouldShowHelp: this.state.shouldShowRepeatPaswordHelp,
			onChangeCallback: event => {
				Actions.Create.validateField('repeatPassword', event.target.value);
			},
			toggleShowHelpCallback: () => {
				Actions.Create.toggleShowHelp('repeatPassword');
			}
		}));

		formInner.push(React.DOM.input({
			key: 3,
			type: 'submit',
			value: 'Create',
			className: 'button positive medium',
			onClick: this.submitAction
		}));


		if(this.state.isWaiting) {
			formInner.push(React.DOM.div({
				key: 4,
				className: 'waiting'
			}));
		}

		inner.push(React.DOM.form({key: 1}, formInner));

		inner.push(React.DOM.p({key: 2}, [
			'Need to verify your email address? ',
			React.createElement(ReactRouter.Link,
				{key: 1, to: "verify"}, "Click here"
			),
			'.'
		]));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		// Get new states from store
		let state = getState();

		// Add in states not controlled by store
		state.showExpanded = this.state.showExpanded;

		this.setState(state);
	}
});