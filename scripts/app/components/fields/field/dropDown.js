import Actions from '../../../actions';
import assign from 'object-assign';
import base from './../../base';
import React from 'react';

export default React.createClass(assign({}, base, {
	displayName: 'Drop Down',
	render: function() {
		let inner = [];

		this.props.options.map((o, i) => {
			inner.push(React.DOM.option({
				key: i,
				value: o[0]
			}, o[1]));
		});

		return React.DOM.select({
			value: this.props.values[0],
			id: this.props.ids[0],
			onChange: event => {
				Actions.Fields.onFieldChange({
					name: this.props.name,
					value: event.target.value,
					vIndex: 0
				});
			}
		}, inner);
	}
}));