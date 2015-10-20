import Actions from '../actions';
import ActivateStore from '../stores/activate';
import Fields from '../components/fields';
import FieldsStore from '../stores/fields';
import Footer from '../components/footer';
import Logo from '../components/logo';
import React from 'react/addons';
import {Link} from 'react-router';
import TransitionGroup from '../utilities/velocityTransitionGroup.js';
import base from '../components/base';
import assign from 'object-assign';
import immutable from 'seamless-immutable';

let getState = () => {
	return {
		message: ActivateStore.get(['message']),
		showMessage: ActivateStore.get(['showMessage']),
		isWaiting: ActivateStore.get(['isWaiting']),
		fields: immutable(FieldsStore.get(['fields']))
	};
};

export default React.createClass(assign({}, base, {
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
		let wrapperInner = [];

		wrapperInner.push(<h1 key={0}><Link to='/'><Logo /></Link></h1>);

		wrapperInner.push(<h2 key={1}>Activate</h2>);

		wrapperInner.push(
			<div key='notice' className='notice'>
				Please check your email address to activate your account.
			</div>
		);

		wrapperInner.push(
			<Fields
				key={2}
				fields={this.state.fields}
				submitHandler={this.submitHandler}
			/>
		);

		wrapperInner.push(
			<button
				className='submit button medium positive'
				key={3}
				onClick={this.submitHandler}
				id='activate'
			>Activate</button>
		);

		let transitionInner = [];

		if(this.state.showMessage) {
			transitionInner.push(
				<div
					className='message modal'
					key='message'
				>
					<div className='content centered'>
						<h2>{this.state.message}</h2>
					</div>
					<div className='controls'>
						<button
							className='button medium neutral'
							onClick={() => {Actions.Activate.changeShowMessage(false);}}
						>Close</button>
					</div>
				</div>
			);
		}

		if(this.state.isWaiting) {
			transitionInner.push(<div key='waiting' className='waiting' />);
		}

		wrapperInner.push(
			<TransitionGroup
				key={4}
				transitionName='fade-fast'
				transitionAppear={true}
			>{transitionInner}</TransitionGroup>
		);

		return (
			<div className='activate view standard thin'>
				<div className='wrapper' key={0}>{wrapperInner}</div>
				<Footer key={1} />
			</div>
		);
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
}));