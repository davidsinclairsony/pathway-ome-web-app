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
		showQuestions: 0,
		questions: [],
		chat: [],
		customQuestion: undefined
	};
};
let storage;

let Store = assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	ask: function(question) {
		let internalQuestionId = storage.chat.length;

		storage.chat.push(
			{
				type: 'question',
				data: question,
				internalId: internalQuestionId
			},
			{
				type: 'answer',
				status: 'pending',
				internalQuestionId
			}
		);

		// Groom data
		let data;

		if(question.questionId) {
			data = {questionId: question.questionId};
		} else {
			data = question;
		}

		this.changeShowQuestions('down');
		Talk.ask(
			data, response => {this.askHandler(internalQuestionId, response);}
		);
	},
	askAnother: function() {
		this.changeShowQuestions('partial');
	},
	askHandler: function(internalQuestionId, response) {
		if(response.status && response.status !== 200) {
			this.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		} else {
			this.updateAnswer(internalQuestionId, response);
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
		let top;

		switch(word) {
			case 'up':
				top = 0;
				break;
			case 'partial':
				top = 30;
				break;
			case 'down':
				top = 100;
				break;
		}

		storage.showQuestions = top;
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
		Talk.suggestions(reponse => {this.suggestionsHandler(reponse);});
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	saveCustom: function(value) {
		storage.customQuestion = value.replace('\n', '');
	},
	suggestionsHandler: function(response) {
		if(response.status && response.status !== 200) {
			this.changeShowQuestions('down');

			this.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		} else {
			this.changeShowQuestions('up');
			storage.questions = response;
		}

		storage.isWaiting = false;
		this.emitChange();
	},
	updateAnswer: function(questionId, answer) {
		console.log(questionId);
		console.log(answer);

		console.log(storage.chat);
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
		case Constants.Actions.CONVERSATION_SAVE_CUSTOM:
			Store.saveCustom(action.value);
			Store.emitChange();
			break;
	}
});

export default Store;