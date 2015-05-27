import {React} from './libs';
import start from './app/components/start';
import Store from './app/store';

module.exports = React.createClass({displayName: 'App',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		let inner = [];

		// Add start view
		inner.push(React.createElement(start, {
			key: 0,
			isPreviousUser: Store.isPreviousUser()
		}));

		return React.DOM.div({className: 'app'}, inner);
	}
});