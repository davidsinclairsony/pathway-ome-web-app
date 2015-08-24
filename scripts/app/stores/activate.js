import Actions from '../actions';
import assign from 'object-assign';
import User from '../utilities/user';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';
import router from '../router';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'activate',
		message: undefined,
		showMessage: false,
		isWaiting: false
	};
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	changeIsWaiting: function(value) {
		storage.isWaiting = value;
	},
	changeShowMessage: function(value, message) {
		storage.showMessage = value;

		if(message) {
			storage.message = message;
		}
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	get: function(keys) {
		let value = storage;

		for(let key in keys) {
			value = value[keys[key]];
		}

		return value;
	},
	initialize: function() {
		storage = defaults();
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	submit: function(fields) {
		storage.isWaiting = true;
		User.activate({pin: fields.pin.values[0]}, this.submitHandler);
	},
	submitHandler: function(response) {
		if(response.status && response.status !== 204) {
			storage.isWaiting = false;
			Actions.Activate.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		} else {
			router.transitionTo('home');
		}
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.ACTIVATE_CHANGE_IS_WAITING:
			Store.changeIsWaiting(action.value);
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_CHANGE_SHOW_MESSAGE:
			Store.changeShowMessage(action.value, action.message);
			Store.emitChange();
			break;
		case Constants.Actions.ACTIVATE_SUBMIT:
			Store.submit(action.fields);
			Store.emitChange();
			break;
	}
});

export default Store;