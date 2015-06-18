import {React, ReactRouter} from './../libs';
import app from '../app';
import start from './views/start';
import activate from './views/activate';
import reset from './views/activate';
import error from './views/error';
import consent from './views/consent';
import home from './views/home';

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
	React.createElement(Route,
		{path: 'consent', name: 'consent', handler: consent}
	),
	React.createElement(Route,
		{path: 'profile', name: 'profile', handler: home}
	),
	React.createElement(DefaultRoute,
		{name: 'home', handler: home}
	)
);