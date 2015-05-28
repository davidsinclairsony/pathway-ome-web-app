import {React, TweenMax} from '../../libs';
import logo from './logo';
import create from './create';
import login from './login';
import footer from './footer';

export default React.createClass({
	displayName: 'Start',
	mixins: [React.addons.PureRenderMixin],
	render: function() {
		let inner = [];
		let props = {
			className: 'start view'
		};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		// Add create component
		inner.push(React.createElement(create, {
			key: 1,
			showExpanded: !this.props.isPreviousUser,
			collapsible: true,
			isEmailValid: true,
			isPasswordValid: true
		}));

		// Add login component
		inner.push(React.createElement(login, {
			key: 2,
			showExpanded: this.props.isPreviousUser,
			collapsible: true,
			isEmailValid: false,
			isPasswordValid: false
		}));

		// Add footer
		inner.push(React.createElement(footer, {key: 3}));

		return React.DOM.div(props, inner);
	}
});