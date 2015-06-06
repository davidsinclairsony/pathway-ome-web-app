import {assign, events} from '../../libs';

let CHANGE_EVENT = 'change';

export default assign({}, events.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});