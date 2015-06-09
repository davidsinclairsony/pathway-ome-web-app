import {assign, React} from '../../libs';
import base from './base';

export default React.createClass(assign({}, base, {
	displayName: 'Input',
	getInitialState: function() {
		return { input: this.props.input || ''};
	},
	setHelpStyle: function() {
		// Only do this when help is actually showing
		if(this.props.showHelp) {
			// Get email help node
			let help = this.getDOMNode()
				.getElementsByTagName('aside')[0]
				.getElementsByClassName('help')[0]
			;

			// Ensure vertical centering
			help.style.top = 20 - help.offsetHeight / 2 + 'px';
		}
	},
	componentDidMount: function() {
		this.setHelpStyle();
	},
	componentDidUpdate: function() {
		this.setHelpStyle();
	},
	render: function() {
		let inner = [];

		inner.push(React.DOM.div({
			key: 0,
			className: 'icon-' + this.props.type
		}));
		inner.push(React.DOM.input({
			key: 1,
			type: this.props.type,
			value: this.props.value,
			placeholder: this.props.placeholder,
			onChange: this.props.onChangeCallback
		}));

		// Prepare aside if verification is desired
		if(this.props.shouldValidate) {
			let asideInner = [];

			if(typeof(this.props.isValid) !== 'undefined') {
				if(this.props.isValid) {
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
						onClick: this.props.toggleShowHelpCallback
					}));

					// Show help content if clicked
					if(this.props.showHelp) {
						asideInner.push(React.DOM.div({
							key: 1,
							className: 'help'
						}, this.props.help));
					}
				}
			}

			inner.push(React.DOM.aside({key: 2}, asideInner));
		}

		return React.DOM.div({className: 'input'}, inner);
	}
}));