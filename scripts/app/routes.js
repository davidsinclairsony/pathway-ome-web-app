import {React, ReactRouter} from './../libs';
import app from '../app';
import start from './views/start';
import activate from './views/activate';
import reset from './views/activate';
import error from './views/error';

let Route = ReactRouter.Route;
let DefaultRoute = ReactRouter.DefaultRoute;
let NotFoundRoute = ReactRouter.NotFoundRoute;

export default React.createElement(Route, {handler: app, path: "/"},
	React.createElement(NotFoundRoute,
		{name: 'error', handler: error}
	),
	React.createElement(Route,
		{path: 'reset', name: 'reset', handler: reset}
	),
	React.createElement(Route,
		{path: 'activate', name: 'activate', handler: activate}
	),
	React.createElement(Route,
		{path: 'activate/:jwt', name: 'activateJWT', handler: activate}
	),
	React.createElement(Route,
		{path: 'start', name: 'start', handler: start}
	),
	React.createElement(DefaultRoute,
		{name: 'home', handler: start}
	)
);