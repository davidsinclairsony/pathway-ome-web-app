import Actions from '../../../actions';
import assign from 'object-assign';
import base from './../../base';
import React from 'react/addons';

export default React.createClass(assign({}, base, {
	displayName: 'Text Input',
	render: function() {
		let inner = [];

		for(let i = 0; i < this.props.count; i++) {
			inner.push(React.DOM.input({
				onKeyUp: e => {
					if(e.keyCode == 13) {
						this.props.submitHandler(e);
					}
				},
				onBlur: this.props.name == 'email'?
					this.props.emailBlurHandler : undefined,
				id: this.props.ids[i],
				key: this.props.ids[i],
				type: this.props.htmlType,
				value: this.props.values[i],
				maxLength: this.props.characterLimiters ?
					this.props.characterLimiters[i] : '',
				placeholder: this.props.placeholders[i],
				onChange: event => {
					Actions.Fields.onFieldChange({
						name: this.props.name,
						value: this.props.name == 'email'?
							event.target.value.toLowerCase() : event.target.value,
						vIndex: i
					});
				}
			}));
		}

		return React.DOM.div({className: 'inputs count' + this.props.count}, inner);
	}
}));