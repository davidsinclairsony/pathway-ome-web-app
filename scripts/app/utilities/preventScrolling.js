export default e => {
	var shouldAllowEvent = function(element) {
		// Must be an element that is not the document or body
		if(!element || element === document || element === document.body) {
			return false;
		}

		// Allow any input or textfield events
		if(['INPUT', 'TEXTAREA'].indexOf(element.tagName) !== -1) {
			return true;
		}

		// Get margin and outerHeight for final check
		const styles = window.getComputedStyle(element);
		const margin = parseFloat(styles['marginTop']) +
			parseFloat(styles['marginBottom']);
		const outerHeight = Math.ceil(element.offsetHeight + margin);

		return (
			(element.scrollHeight > outerHeight) &&
			margin >= 0
		);
	};

	let target = e.target;

	// Get first element to have scroll bars or stop at body
	while(target !== null) {
		if(shouldAllowEvent(target)) {
			break;
		}

		target = target.parentNode;
	}

	// Prevent if nothing is scrollable
	if(!target) {
		e.preventDefault();
	} else {
		var top = target.scrollTop;
		var totalScroll = target.scrollHeight;
		var currentScroll = top + target.offsetHeight;

		// If at container edge, add a pixel to prevent outer scrolling
		if(top === 0) {
			target.scrollTop = 1;
		} else if(currentScroll === totalScroll) {
			target.scrollTop = top - 1;
		}
	}
};