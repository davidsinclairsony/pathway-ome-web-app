import Actions from '../../../actions';
import assign from 'object-assign';
import base from './../../base';
import React from 'react/addons';
import Slider from 'react-slider';

export default React.createClass(assign({}, base, {
	displayName: 'Height Slider',
	render: function() {
		let inner = [];
		let inchesToString = inches => {
			if(!inches) {
				inches = 0;
			}

			let feet = Math.floor(inches / 12);
			inches %= 12;

			return feet + '\' ' + inches + '"';
		};

		inner.push(React.createElement(Slider, {
			key: 'slider',
			id: this.props.ids[0],
			withBars: true,
			min: 24,
			max: 96,
			value: this.props.values[0],
			onChange: value => {
				Actions.Fields.onFieldChange({
					name: this.props.name,
					value,
					vIndex: 0
				});
			}
		}));

		inner.push(React.DOM.div({
			className: 'display',
			key: 'display'
		}, inchesToString(this.props.values[0])));

		return React.DOM.div({className: 'inputs'}, inner);
	}
}));