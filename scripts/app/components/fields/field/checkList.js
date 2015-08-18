import Actions from '../../../actions';
import assign from 'object-assign';
import base from './../../base';
import React from 'react/addons';
import Widgets from 'react-widgets';

export default React.createClass(assign({}, base, {
	displayName: 'Check List',
	render: function() {
		return React.createElement(Widgets.SelectList, {
			className: this.props.className + ' inputs count' + this.props.data.length,
			multiple: this.props.multiple,
			valueField: 'id',
			textField: 'name',
			data: this.props.data,
			onChange: value => {
				Actions.Fields.onFieldChange({
					name: this.props.name,
					value,
					vIndex: 0
				});
			}
		});
	}
}));