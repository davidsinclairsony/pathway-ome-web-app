import {React, ReactRouter} from './../libs';
import app from '../app';
import start from './views/start';
import verify from './views/verify';

let Route = ReactRouter.Route;
let DefaultRoute = ReactRouter.DefaultRoute;
let NotFoundRoute = ReactRouter.NotFoundRoute;

export default (React.createElement(Route, {handler: app, path: "/"},
	/*React.createElement(NotFoundRoute,
		{name: 'notFound', handler: notFound}
	),
	React.createElement(Route,
		{path: 'reset-password', name: 'resetPassword', handler: resetPassword}
	),*/
	React.createElement(Route,
		{path: 'verify', name: 'verify', handler: verify}
	),
	React.createElement(DefaultRoute,
		{name: 'home', handler: start}
	)
));