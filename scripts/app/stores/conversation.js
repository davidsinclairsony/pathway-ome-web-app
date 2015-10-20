import assign from 'object-assign';
import User from '../utilities/user';
import Talk from '../utilities/talk';
import Help from '../data/help';
import Constants from '../constants';
import Dispatcher from '../dispatcher';
import events from 'events';
import Validator from '../utilities/validator';

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
		chatLength: 0,
		customQuestion: '',
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
			answer: {status: 'pending'},
			feedback: {
				showComment: false,
				rating: undefined,
				comment: undefined
			}
		});

		storage.chatLength++;

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
		if(response.status) {
			if(response.status !== 202) {
				this.changeShowMessage(true,
					'Sorry, there was an error: ' +
					JSON.parse(response.response).message
				);

				let displayedError = 'Sorry, there was an error.';
				storage.chat[chatIndex].answer.status = 'error';
				storage.chat[chatIndex].answer.data = {summary: displayedError};
			} else {
				storage.chat[chatIndex].conversationID = response.conversationID;
				storage.chat[chatIndex].answer.status = 'incomplete';
				storage.chat[chatIndex].answer.dataNeeded = response.required;
				storage.chat[chatIndex].answer.dataNeeded.forEach(o => {
					o = assign(o, {
						help: {
							isValid: undefined,
							content: '',
							showHelp: false,
							required: o.default,
							showIcon: undefined
						}
					});
				});
			}
		} else {
			// Replace variables
			let replaceVariables = string => {
				let a = string.indexOf('{{');
				let b = string.indexOf('}}');

				if(a !== -1 && b !== -1) {
					let variable = string.substring(a + 2, b);
					let match = User.get(sessionStorage, variable);

					if(match) {
						string = string.replace(string.substring(a, b + 2), match);
					}

					string = replaceVariables(string);
				}

				return string;
			};

			// Replace \n with <br />
			let replaceLineEnds = string => {
				let a = string.indexOf('\n');
				if(a !== -1) {
					string = replaceLineEnds(
						string.replace(string.substring(a, a + 1), '<br />')
					);
				}

				return string;
			};

			let summary = replaceVariables(response.answer.summary);
			summary = replaceLineEnds(summary);

			storage.chat[chatIndex].answer.data = assign({}, response.answer, {
				summary
			});

			storage.chat[chatIndex].conversationID = response.conversationID;
			storage.chat[chatIndex].answer.status = 'complete';
		}

		this.emitChange();
	},
	changeShowComment: function(id, value) {
		storage.chat[id].feedback.showComment = value;
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
	commentSubmit: function(id) {
		if(
			storage.chat[id].feedback.comment &&
			storage.chat[id].feedback.comment != ''
		) {
			this.updateFeedback(id);
			this.changeShowComment(id, false);
		}
	},
	customSubmit: function() {
		if(storage.customQuestion.length > 0) {
			this.ask({question: storage.customQuestion});
			storage.customQuestion = '';
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
			storage.questions = response[0]? response[0] : [];
			storage.location = response[1];
			User.saveObject(sessionStorage, response[2]);

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
	saveComment: function(id, comment) {
		storage.chat[id].feedback.comment = comment;
	},
	saveCustom: function(value) {
		storage.customQuestion = value.replace('\n', '');
	},
	updateFeedback: function(id, feedback) {
		// Save any passed in feedback
		if(feedback) {
			storage.chat[id].feedback = assign(
				{}, storage.chat[id].feedback, feedback
			);
		}

		// Prepare data for API
		let data = {
			conversationID: storage.chat[id].conversationID,
			userRating: {
				type: 'rangeInt3',
				score: storage.chat[id].feedback.rating,
				comment: storage.chat[id].feedback.comment
			}
		};

		Talk.updateFeedback(data, response => {
			this.updateFeedbackHandler(response);
		});
	},
	updateFeedbackHandler: function(response) {
		if(response.status && response.status !== 204) {
			this.changeShowMessage(true,
				'Sorry, there was an error: ' +
				JSON.parse(response.response).message
			);
		}

		this.emitChange();
	},
	askerSubmit: function(id) {
		console.log('submitted for chat id:' + id);
	},
	askerOnInputChange: function(o) {
		let neededObject = storage.chat[o.chatId].answer.dataNeeded[o.askerId];

		// Save value
		neededObject.value = o.value;

		// Validate
		neededObject.help.isValid = Validator.validate({
			name: neededObject.type,
			o: neededObject
		});

		// Set help
		if(neededObject.help.isValid === false) {
			switch(neededObject.type) {
				case 'number':
					neededObject.help.content = Help.number + neededObject.min +
						' and ' + neededObject.max + '.';
					break;
			}
		}

		// Show help icon?
		if(
			neededObject.value != '' ||
			(
				typeof(neededObject.help.isValid) !== 'undefined' &&
				neededObject.required
			)

		) {
			neededObject.help.showIcon = true;
		} else {
			neededObject.help.showIcon = false;
		}
	},
	askerChangeShowHelp: function(o) {
		storage.chat[o.chatId].answer.dataNeeded[o.askerId].help.showHelp =
			o.value;
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
		case Constants.Actions.CONVERSATION_CHANGE_SHOW_COMMENT:
			Store.changeShowComment(action.id, action.value);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_UPDATE_FEEDBACK:
			Store.updateFeedback(action.id, action.feedback);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_SAVE_COMMENT:
			Store.saveComment(action.id, action.comment);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_COMMENT_SUBMIT:
			Store.commentSubmit(action.id);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_ASKER_SUBMIT:
			Store.askerSubmit(action.id);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_ASKER_ON_INPUT_CHANGE:
			Store.askerOnInputChange(action.o);
			Store.emitChange();
			break;
		case Constants.Actions.CONVERSATION_ASKER_CHANGE_SHOW_HELP:
			Store.askerChangeShowHelp(action.o);
			Store.emitChange();
	}
});

export default Store;
