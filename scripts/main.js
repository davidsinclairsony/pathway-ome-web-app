import {FastClick, React, ReactRouter} from './libs';
import app from './app';
import routes from './app/routes';

document.addEventListener('DOMContentLoaded', () => {
	FastClick(document.body);

	const app = document.getElementById('app');

	ReactRouter.run(routes, ReactRouter.HistoryLocation, (Handler) => {
		React.render(React.createElement(Handler, null), document.body);
	});
});