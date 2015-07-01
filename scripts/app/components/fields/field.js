import {assign, React} from '../../../libs';
import Actions from '../../actions';
import base from '.././base';
import textInput from './field/textInput';

export default React.createClass(assign({}, base, {
	displayName: 'Field',
	render: function() {
		let inner = [];
		let props = {
			className: this.props.classes + ' field ' + this.props.input.type
		};

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
				containerInner.push(React.createElement(textInput, assign({}, {
						key: this.props.input.type,
						store: this.props.store
				}, this.props.input)));
				break;
			case 'dropdown':
				break;
			case 'radio':
				break;
			case 'checkbox':
				break;
		}

		// Prepare aside if verification is desired
		if(this.props.help.validate) {
			props.className += ' validating';
			let asideInner = [];

			if(typeof(this.props.help.isValid) !== 'undefined') {
				if(this.props.help.isValid) {
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
						onClick: () => {
							Actions.Fields.changeShowHelp({
								field: this.props.classes,
								value: !this.props.help.showHelp
							});
						}
					}));

					// Show help content if clicked
					if(this.props.help.showHelp) {
						asideInner.push(React.DOM.div({
							key: 1,
							className: 'help'
						}, this.props.help.content));
					}
				}
			}

			containerInner.push(React.DOM.aside({key: 1}, asideInner));
		}

		// Add container
		inner.push(React.DOM.div({
			key: 1,
			className: 'container'
		}, containerInner));

		return React.DOM.li(props, inner);
	}
}));