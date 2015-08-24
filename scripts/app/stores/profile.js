import Actions from '../actions';
import assign from 'object-assign';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';
import User from '../utilities/user';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'profile',
		message: undefined,
		showMessage: false,
		isWaiting: true,
		showForm: false,
		fetchedHci: undefined
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
	fetchHciHandler: function(response) {
		console.log(response);
		if(response.status && response.status !== 200) {
			storage.showForm = true;
			this.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		} else {
			storage.showForm = true;

			Actions.Fields.fill(response);
		}

		storage.isWaiting = false;
		this.emitChange();
	},
	initialize: function() {
		storage = defaults();
		User.fetchHci(reponse => {this.fetchHciHandler(reponse);});
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.PROFILE_CHANGE_IS_WAITING:
			Store.changeIsWaiting(action.value);
			Store.emitChange();
			break;
		case Constants.Actions.PROFILE_CHANGE_SHOW_MESSAGE:
			Store.changeShowMessage(action.value, action.message);
			Store.emitChange();
			break;
		case Constants.Actions.PROFILE_CLOSE:
			Store.close();
			Store.emitChange();
			break;
		case Constants.Actions.PROFILE_SUBMIT:
			Store.submit(action.fields);
			Store.emitChange();
			break;
	}
});

export default Store;