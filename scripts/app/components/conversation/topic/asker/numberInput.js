import Actions from '../../../../actions';
import assign from 'object-assign';
import base from '../../../base';
import React from 'react/addons';

export default React.createClass(assign({}, base, {
	displayName: 'Number Input',
	render: function() {
		return (
			<input
				onKeyUp={e => {
					if(e.keyCode == 13) {
						Actions.Conversation.askerSubmit(this.props.id);
					}
				}}
				id={this.props.name}
				type={this.props.type}
				value={this.props.value}
				placeholder={this.props.description}
				maxLength={this.props.max}
				onChange={event => {
					Actions.Conversation.onAskerInputChange({
						id: this.props.id,
						name: this.props.name,
						type: 'number',
						value: event.target.value,
						validation: {
							min: this.props.min,
							max: this.props.max
						}
					});
				}}
			/>
		);
	}
}));