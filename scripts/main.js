var FastClick = require('./libs').FastClick;
var React = require('./libs').React;
var app = require('./app');

document.addEventListener('DOMContentLoaded', function(e) {
	FastClick(document.body);
	React.render(React.createElement(app, null), document.body);
});