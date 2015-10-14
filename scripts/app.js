import assign from 'object-assign';
import base from './app/components/base';
import React from 'react/addons';
import TransitionGroup from './app/utilities/velocityTransitionGroup.js';

export default React.createClass(assign({}, base, {
	displayName: 'App',
	render: function() {
		return (
			<div id='app'>
				<TransitionGroup
					transitionName='fade-fast'
					transitionAppear={true}
				>
					<div key={this.props.location.pathname}>
						{this.props.children}
					</div>
				</TransitionGroup>
			</div>
		);
	}
}));