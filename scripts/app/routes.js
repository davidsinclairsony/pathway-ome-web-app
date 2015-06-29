import {React, ReactRouter} from './../libs';
import app from '../app';
//import activate from './views/activate';
import create from './views/create';
import error from './views/error';
import home from './views/home';
//import login from './views/login';
//import reset from './views/activate';

let DefaultRoute = ReactRouter.DefaultRoute;
let NotFoundRoute = ReactRouter.NotFoundRoute;
let Route = ReactRouter.Route;

export default React.createElement(Route, {handler: app, path: "/"},
	React.createElement(DefaultRoute, {name: 'home', handler: home}),
	React.createElement(NotFoundRoute, {name: 'error', handler: error}),
	//React.createElement(Route, {name: 'activate', handler: activate}),
	React.createElement(Route, {name: 'create', handler: create}),
	//React.createElement(Route, {name: 'login', handler: login}),
	React.createElement(Route,{name: 'profile', handler: home})
	//React.createElement(Route, {name: 'reset', handler: reset})
);