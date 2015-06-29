import {assign, React} from '../../libs';
import base from './base';
import textInput from './field/textInput';

export default React.createClass(assign({}, base, {
	displayName: 'Field',
	render: function() {
		let inner = [];

		// Add label
		inner.push(React.DOM.label({
			key: 0,
			htmlFor: this.props.label.htmlFor
		}, this.props.label.content));

		// Make container for input and aside
		let containerInner = [];

		// Add input based on type
		switch(this.props.input.type) {
			case 'textInput':
				containerInner.push(React.createElement(textInput, assign(
					{}, {key: this.props.input.type}, this.props.input
				)));
				break;
			case 'dropdown':
				break;
			case 'radio':
				break;
			case 'checkbox':
				break;
		}

		// Prepare aside if verification is desired
		/*
		if(this.props.validate) {
			let asideInner = [];

			if(typeof(this.props.universal.isValid) !== 'undefined') {
				if(this.props.universal.isValid) {
					// Add success icon
					asideInner.push(React.DOM.div({
						key: 0,
						className: 'icon-check circle positive small'
					}));
				} else {
					// Add help icon
					asideInner.push(React.DOM.div({
						key: 0,
						className: 'icon-help circle negative small clickable',
						onClick: this.props.universal.toggleShowHelp
					}));

					// Show help content if clicked
					if(this.props.universal.showHelp) {
						asideInner.push(React.DOM.div({
							key: 1,
							className: 'help'
						}, this.props.universal.help));
					}
				}
			}

			containerInner.push(React.DOM.aside({key: 1}, asideInner));
		}*/

		// Add container
		inner.push(React.DOM.div({
			key: 1,
			className: 'container'
		}, containerInner));

		return React.DOM.li({
			className: this.props.classes + ' field ' + this.props.input.type
		}, inner);
	}
}));