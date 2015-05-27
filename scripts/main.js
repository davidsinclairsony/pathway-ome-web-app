import {FastClick, React} from './libs';
import app from './app';

document.addEventListener('DOMContentLoaded', function(e) {
	FastClick(document.body);
	React.render(React.createElement(app, null), document.body);
});