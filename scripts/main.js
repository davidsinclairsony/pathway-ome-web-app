import FastClick from 'fastclick';
import history from './app/history';
import React from 'react/addons'; // eslint-disable-line no-unused-vars
import {Router} from 'react-router';
import routes from './app/routes';
import preventScrolling from './app/utilities/preventScrolling';

FastClick(document.body);

window.addEventListener('orientationchange', () => {location.reload();});

const main = document.getElementById('main');

React.render(<Router history={history}>{routes}</Router>, main);

document.addEventListener('touchstart', preventScrolling);
document.addEventListener('mousedown', preventScrolling);