import Actions from '../../../actions';
import assign from 'object-assign';
import base from './../../base';
import React from 'react/addons';
import Slider from 'react-slider';

export default React.createClass(assign({}, base, {
	displayName: 'Height Slider',
	render: function() {
		let inner = [];

		inner.push(React.createElement(Slider, {withBars: true},
    React.createElement("div", {className: "my-handle"}, "1"),
    React.createElement("div", {className: "my-handle"}, "2"),
    React.createElement("div", {className: "my-handle"}, "3")
  ));

		return React.DOM.div({
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