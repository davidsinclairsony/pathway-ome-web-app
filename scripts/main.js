import FastClick from 'fastclick';
import history from './app/history';
import React from 'react/addons'; // eslint-disable-line no-unused-vars
import {Router} from 'react-router';
import routes from './app/routes';

FastClick(document.body);

const main = document.getElementById('main');

React.render(<Router history={history}>{routes}</Router>, main);

const preventScrolling = e => {
	let target = e.target;

	// Get first element to have scroll bars and stop at body
	while(target !== document.body) {
		const styles = window.getComputedStyle(target);
		const margin = parseFloat(styles['marginTop']) +
			parseFloat(styles['marginBottom']);
		const outerHeight = Math.ceil(target.offsetHeight + margin);

		if(target.scrollHeight > outerHeight && outerHeight !== 0) {
			break;
		}

		target = target.parentNode;
	}

	// Prevent if nothing is scrollable
	if(target === document.body) {
		console.log('prevented!');
		e.preventDefault();
	} else {
		console.log('scrolling!');
		const top = target.scrollTop;
		const totalScroll = target.scrollHeight;
		const currentScroll = top + target.offsetHeight;

		// If at container edge, add a pixel to prevent outer scrolling
		if(top === 0) {
			target.scrollTop = 1;
		} else if(currentScroll === totalScroll) {
			target.scrollTop = top - 1;
		}
	}
};

document.addEventListener('touchstart', preventScrolling);
document.addEventListener('mousedown', preventScrolling);