import FastClick from 'fastclick';
import history from './app/history';
import React from 'react/addons'; // eslint-disable-line no-unused-vars
import {Router} from 'react-router';
import routes from './app/routes';

FastClick(document.body);

const main = document.getElementById('main');

React.render(<Router history={history}>{routes}</Router>, main);