import FastClick from 'fastclick';
import history from './app/history';
import React from 'react/addons';
import {Router} from 'react-router';
import routes from './app/routes';

document.addEventListener('DOMContentLoaded', () => {
	FastClick(document.body);

	React.render((
		<Router history={history}>
			{routes}
		</Router>
	), document.body);
});