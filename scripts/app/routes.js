import {React, ReactRouter} from './../libs';
import app from '../app';
import start from './views/start';
import activate from './views/activate';

let Route = ReactRouter.Route;
let DefaultRoute = ReactRouter.DefaultRoute;
let NotFoundRoute = ReactRouter.NotFoundRoute;

export default React.createElement(Route, {handler: app, path: "/"},
	/*React.createElement(NotFoundRoute,
		{name: 'notFound', handler: notFound}
	),
	React.createElement(Route,
		{path: 'reset-password', name: 'resetPassword', handler: resetPassword}
	),*/
	React.createElement(Route,
		{path: 'activate', name: 'activate', handler: activate}
	),
	React.createElement(DefaultRoute,
		{name: 'home', handler: start}
	)
);