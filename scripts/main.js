import {FastClick, React} from './libs';
import router from './app/router';

document.addEventListener('DOMContentLoaded', () => {
	FastClick(document.body);

	router.run((Handler) => {
		React.render(React.createElement(Handler, null), document.body);
	});
});