import assign from 'object-assign';
import Talk from '../utilities/talk';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';

let CHANGE_EVENT = 'change';
let defaults = () => {
	return {
		name: 'conversation',
		message: undefined,
		showMessage: false,
		isWaiting: true,
		showQuestions: undefined,
		questions: [],
		chat: [],
		customQuestion: undefined,
		location: undefined,
		showAskAnother: false,
		showRetry: false
	};
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	ask: function(question) {
		let id = storage.chat.length;

		storage.chat.push({
			id,
			question,
			answer: {status: 'pending'}
		});

		// Groom data
		let data;

		if(question.questionId) {
			data = {questionId: question.questionId};
		} else {
			data = question;
		}

		data.location = {
			lat: storage.location.latitude,
			lng: storage.location.longitude
		};

		this.changeShowQuestions('down');
		storage.showAskAnother = true;

		Talk.ask(data, response => {
			this.askHandler(id, response);
		});
	},
	askAnother: function() {
		this.changeShowQuestions('partial');
	},
	askHandler: function(chatIndex, response) {
		if(
			response.status &&
			(response.status !== 200 || response.status !== 202)
		) {
			this.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);

			storage.chat[chatIndex].answer.status = 'error';
			storage.chat[chatIndex].answer.data = {
				text: 'Sorry, there was an error.'
			};
		} else {
			storage.chat[chatIndex].conversationID = response.conversationID;
			storage.chat[chatIndex].answer.status = 'complete';
			storage.chat[chatIndex].answer.data = response.answer;
		}

		this.emitChange();
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
	changeShowQuestions: function(word) {
		let height;

		switch(word) {
			case 'up':
				height = 100;
				break;
			case 'partial':
				height = 70;
				break;
			case 'down':
				height = 0;
				break;
		}

		storage.showQuestions = height;
	},
	customSubmit: function() {
		if(storage.customQuestion.length > 0) {
			this.ask({question: storage.customQuestion});
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

		// Get suggestions list
		Talk.initialize(reponse => {this.initializeHandler(reponse);});
	},
	initializeHandler: function(response) {
		if(response.status && response.status !== 200) {
			this.changeShowQuestions('down');

			this.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);

			storage.showAskAnother = false;
			storage.showRetry = true;
		} else {
			storage.questions =  response[0]? response[0] : [];
			storage.location = response[1];

			this.changeShowQuestions('up');
			storage.showAskAnother = true;
			storage.showRetry = false;
		}

		storage.isWaiting = false;
		this.emitChange();
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	retry: function() {
		this.initialize();
	},
	saveCustom: function(value) {
		storage.customQuestion = value.replace('\n', '');
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.Actions.CONVERSATION_ASK:
			Store.ask(action.question);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_ASK_ANOTHER:
			Store.askAnother();
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_CHANGE_IS_WAITING:
			Store.changeIsWaiting(action.value);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_CHANGE_SHOW_MESSAGE:
			Store.changeShowMessage(action.value, action.message);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_CUSTOM_SUBMIT:
			Store.customSubmit();
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_RETRY:
			Store.retry();
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_SAVE_CUSTOM:
			Store.saveCustom(action.value);
			Store.emitChange();
			break;
	}
});

export default Store;
