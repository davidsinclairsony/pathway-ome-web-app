import {FastClick, React, ReactRouter} from './libs';
import app from './app';
import routes from './app/routes';

document.addEventListener('DOMContentLoaded', function() {
	FastClick(document.body);

	const app = document.getElementById('app');

	ReactRouter.run(routes, ReactRouter.HistoryLocation, (Handler) => {
		React.render(React.createElement(Handler, null), app, () => {
			console.timeEnd('app render on route change'); // eslint-disable-line no-console
		});
	});

	//React.render(React.createElement(app, null), document.getElementById('app'));
});