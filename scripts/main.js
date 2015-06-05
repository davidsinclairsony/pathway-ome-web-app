import {FastClick, React, ReactRouter} from './libs';
import routes from './app/routes';

document.addEventListener('DOMContentLoaded', () => {
	FastClick(document.body);

	ReactRouter.run(routes, ReactRouter.HistoryLocation, (Handler) => {
		React.render(React.createElement(Handler, null), document.body);
	});
});