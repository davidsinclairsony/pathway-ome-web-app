import Dispatcher from './dispatcher';
import Constants from './constants';

let Login = {

};

let Create = {
	validateField: function(field, value) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_VALIDATE_FIELD,
			field: field,
			value: value
		});
	},
	toggleShowHelp: function(field) {
		Dispatcher.dispatch({
			actionType: Constants.Actions.CREATE_TOGGLE_SHOW_HELP,
			field: field
		});
	}
};

export default {
	Login: Login,
	Create: Create
}