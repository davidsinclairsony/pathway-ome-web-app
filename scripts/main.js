import FastClick from 'fastclick';
import history from './app/history';
import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import {Router} from 'react-router';
import routes from './app/routes';

FastClick(document.body);

const main = document.getElementById('main');

render(<Router history={history}>{routes}</Router>, main);