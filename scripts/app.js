import {React} from './libs';
import start from './app/components/start';
import BaseStore from './app/stores/base';

export default React.createClass({displayName: 'App',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		let inner = [];

		// Add start view
		inner.push(React.createElement(start, {
			key: 0,
			isPreviousUser: BaseStore.isPreviousUser()
		}));

		return React.DOM.div({className: 'app'}, inner);
	}
});