import {React, ReactRouter} from './../libs';
import app from '../app';
import login from './views/login';
import create from './views/create';
import activate from './views/activate';
import reset from './views/activate';
import error from './views/error';
import home from './views/home';

let Route = ReactRouter.Route;
let DefaultRoute = ReactRouter.DefaultRoute;
let NotFoundRoute = ReactRouter.NotFoundRoute;

export default React.createElement(Route, {handler: app, path: "/"},
	React.createElement(NotFoundRoute, {name: 'error', handler: error}),
	React.createElement(Route, {name: 'reset', handler: reset}),
	React.createElement(Route, {name: 'login', handler: login}),
	React.createElement(Route, {name: 'create', handler: create},
		React.createElement(Route, {name: 'consent', handler: create}),
		React.createElement(Route, {name: 'activate', handler: create})
	),
	React.createElement(Route,{name: 'profile', handler: home}),
	React.createElement(DefaultRoute, {name: 'home', handler: home})
);