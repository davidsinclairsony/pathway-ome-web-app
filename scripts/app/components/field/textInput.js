import {assign, React} from '../../../libs';
import Actions from '../../actions';
import base from './../base';
import textInput from './textInput';

export default React.createClass(assign({}, base, {
	displayName: 'Multiple Text Input',
	render: function() {
		let inner = [];

		for(let i = 0; i < this.props.count; i++) {
			inner.push(React.DOM.input({
				id: this.props.ids[i],
				key: this.props.ids[i],
				type: this.props.htmlType,
				value: this.props.values[i],
				maxLength: this.props.characterLimiters ?
					this.props.characterLimiters[i] : '',
				placeholder: this.props.placeholders[i],
				onChange: event => {
					Actions[this.props.store].onFieldChange({
						name: this.props.name,
						value: event.target.value,
						vIndex: i
					});
				}
			}));
		}

		return React.DOM.div({className: 'inputs count' + this.props.count}, inner);
	}
}));