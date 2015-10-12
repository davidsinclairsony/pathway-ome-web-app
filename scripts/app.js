import history from './app/history';
import React from 'react/addons';
import TransitionGroup from './app/utilities/velocityTransitionGroup.js';

export default React.createClass({
	displayName: 'App',
	render: function() {
		let path;
		let unlisten = history.listen(location => {path = location.pathname;});
		unlisten();

		return React.DOM.div({id: 'app'},
			React.createElement(TransitionGroup, {
				transitionName: 'fade-fast',
				transitionAppear: true
			}, <div key={path}>{this.props.children}</div>)
		);
	}
});