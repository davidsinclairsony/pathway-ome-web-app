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
						Actions.Conversation.askerSubmit(this.props.chatId);
					}
				}}
				id={this.props.name}
				type={this.props.type}
				value={this.props.value}
				placeholder={this.props.description}
				maxLength={this.props.max}
				onChange={event => {
					Actions.Conversation.askerOnInputChange({
						chatId: this.props.chatId,
						askerId: this.props.askerId,
						value: event.target.value
					});
				}}
			/>
		);
	}
}));