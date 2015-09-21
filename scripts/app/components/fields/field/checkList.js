import Actions from '../../../actions';
import assign from 'object-assign';
import base from './../../base';
import React from 'react/addons';
import Widgets from 'react-widgets';

export default React.createClass(assign({}, base, {
	displayName: 'Check List',
	render: function() {
		return React.createElement(Widgets.SelectList, {
			className:
				this.props.className + ' inputs count' + this.props.data.length,
			multiple: this.props.multiple,
			valueField: 'id',
			textField: 'name',
			id: this.props.name,
			data: this.props.data,
			value: this.props.values[0],
			onChange: data => {
				let value;

				if(this.props.multiple) {
					value = data.map(function(o) {return o.id;});
				} else {
					value = data.id;
				}

				Actions.Fields.onFieldChange({
					name: this.props.name,
					value,
					vIndex: 0
				});
			}
		});
	}
}));