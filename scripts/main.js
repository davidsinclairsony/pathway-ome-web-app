import FastClick from 'fastclick';
import history from './app/history';
import React from 'react/addons'; // eslint-disable-line no-unused-vars
import {Router} from 'react-router';
import routes from './app/routes';

FastClick(document.body);

const main = document.getElementById('main');

React.render(<Router history={history}>{routes}</Router>, main);

/*const preventScrolling = e => {
	const hasScrollBar = element => {
		if(element || element === document) {
			return false;
		}

		const styles = window.getComputedStyle(element);
		const margin = parseFloat(styles['marginTop']) +
			parseFloat(styles['marginBottom']);
		const outerHeight = Math.ceil(element.offsetHeight + margin);

		return (element.scrollHeight > outerHeight) && margin > 0;
	};

	let target = e.target;

	// Get first element to have scroll bars or stop at body
	while(target !== null) {
		if(hasScrollBar(target)) {
			break;
		}

		target = target.parentNode;
	}

	// Prevent if nothing is scrollable
	if(!target) {
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

$.fn.preventScrolling = function(e) {
	var $target = $(e.target);
	var hasScrollBar = function($this) {
		return $this.get(0).scrollHeight > $this.outerHeight();
	};

	// Get which element could have scroll bars
	if(!hasScrollBar($target)) {
		$target = $target
			.parents()
			.filter(function() {return hasScrollBar($(this));})
			.first()
		;
	}

	// Prevent if nothing is scrollable
	if(!$target.length) {
		console.log('prevented!');
		e.preventDefault();
	} else {
		console.log('scrolling!');
		var top = $target[0].scrollTop;
		var totalScroll = $target[0].scrollHeight;
		var currentScroll = top + $target[0].offsetHeight;

		// If at container edge, add a pixel to prevent outer scrolling
		if(top === 0) {
			$target[0].scrollTop = 1;
		} else if(currentScroll === totalScroll) {
			$target[0].scrollTop = top - 1;
		}
	}
};

$(document).on('touchstart mousedown', function(e) {
		// Prevent scrolling on any touches to screen
		console.log('hit');
		$(this).preventScrolling(e);
	});*/



window.addEventListener('orientationchange', function () {
	alert('detected');
    var originalBodyStyle = getComputedStyle(document.body).getPropertyValue('display');
    document.body.style.display='none';
    setTimeout(function () {
      document.body.style.display = originalBodyStyle;
    }, 1000);
  });