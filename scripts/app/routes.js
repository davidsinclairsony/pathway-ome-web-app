import app from '../app';
import activate from './views/activate';
import consent from './views/consent';
import create from './views/create';
import error from './views/error';
import home from './views/home';
import login from './views/login';
import React from 'react/addons';
import reactivate from './views/reactivate';
import ReactRouter from 'react-router';

let DefaultRoute = ReactRouter.DefaultRoute;
let NotFoundRoute = ReactRouter.NotFoundRoute;
let Route = ReactRouter.Route;

export default React.createElement(Route, {handler: app, path: "/"},
	React.createElement(DefaultRoute, {name: 'home', handler: home}),
	React.createElement(NotFoundRoute, {name: 'error', handler: error}),
	React.createElement(Route, {name: 'activate', handler: activate}),
	React.createElement(Route, {name: 'consent', handler: consent}),
	React.createElement(Route, {name: 'create', handler: create}),
	React.createElement(Route, {name: 'login', handler: login}),
	React.createElement(Route,{name: 'profile', handler: home}),
	React.createElement(Route, {name: 'reactivate', handler: reactivate})
);