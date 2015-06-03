import {React, ReactRouter} from './../libs';
import app from '../app';
import start from './views/start';
import verify from './views/verify';

let Route = ReactRouter.Route;
let Default = ReactRouter.DefaultRoute;
let NotFound = ReactRouter.NotFoundRoute;

export default (React.createElement(Route, {handler: app, path: "/"},
	/*React.createElement(NotFound, {name: 'notFound', handler: NotFound}),
	React.createElement(Route,
		{path: 'reset-password', name: 'resetPassword', handler: Reset}
	),
	React.createElement(Route,
		{path: 'logout', name: 'logout', handler: Logout}
	),*/
	React.createElement(Route,
		{path: 'verify', name: 'verify', handler: verify}
	),
	React.createElement(Default,
		{name: 'home', handler: start}
	)
));