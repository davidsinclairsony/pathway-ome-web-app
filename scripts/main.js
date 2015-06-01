import {FastClick, React} from './libs';
import app from './app';

document.addEventListener('DOMContentLoaded', function(e) {
	// Enable fast touch actions
	FastClick(document.body);

	// Clear localStorage
	localStorage.clear();

	// Start app
	React.render(React.createElement(app, null), document.body);
});