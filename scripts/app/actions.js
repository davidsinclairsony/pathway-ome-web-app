import Dispatcher from './dispatcher';
import Constants from './constants';

let Login = {

};

let Create = {
	goToVerify: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_GO_TO_VERIFY
		});
	},
	hideAllHelp: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_HIDE_ALL_HELP
		});
	},
	onFieldChange: (field, value) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_ON_FIELD_CHANGE,
			field: field,
			value: value
		});
	},
	setHelp: (field, help) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_SET_HELP,
			field: field,
			help: help
		});
	},
	submit: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.CREATE_SUBMIT});
	},
	success: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.CREATE_SUCCESS});
	},
	toggleShowExpanded: () => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_TOGGLE_SHOW_EXPANDED
		});
	},
	toggleShowHelp: field => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_TOGGLE_SHOW_HELP,
			field: field
		});
	},
	validateAll: () => {
		Dispatcher.dispatch({actionType: Constants.Actions.CREATE_VALIDATE_ALL});
	}
};

let Start = {
	toggleShowExpanded: (component) => {
		Dispatcher.dispatch({
			actionType: Constants.Actions.START_TOGGLE_SHOW_EXPANDED,
			component: component
		});
	}
};

export default {Login, Create, Start};