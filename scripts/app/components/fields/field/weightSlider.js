import Actions from '../../../actions';
import assign from 'object-assign';
import base from './../../base';
import React from 'react';
import Slider from 'react-slider';

export default React.createClass(assign({}, base, {
	displayName: 'Weight Slider',
	render: function() {
		let inner = [];

		let formatPounds = pounds => {
			if(!pounds) {
				return '0 lb';
			}

			return pounds + ' lb';
		};

		inner.push(React.DOM.div({
			className: 'display',
			key: 'display'
		}, formatPounds(this.props.values[0])));

		inner.push(React.createElement(Slider, {
			key: 'slider',
			id: this.props.ids[0],
			withBars: true,
			min: 50,
			max: 400,
			value: this.props.values[0],
			onChange: value => {
				Actions.Fields.onFieldChange({
					name: this.props.name,
					value,
					vIndex: 0
				});
			}
		}));

		return React.DOM.div({className: 'inputs'}, inner);
	}
}));