import {React, ReactRouter} from './libs';
import TransitionGroup from './app/utilities/velocityTransitionGroup.js';

export default React.createClass({
	displayName: 'App',
	contextTypes: {router: React.PropTypes.func},
	render: function() {
		let name = this.context.router.getCurrentPath();

		return React.DOM.div({id: 'app'},
			React.createElement(TransitionGroup,
				{
					transitionName: 'fade',
					transitionAppear: true
				},
				React.createElement(ReactRouter.RouteHandler, {key: name})
			)
		);
	}
});