import assign from 'object-assign';
import base from '../../base';
import React from 'react/addons';

export default React.createClass(assign({}, base, {
	displayName: 'Asker',
	render: function() {
		let inner = [];

		this.props.data.map((o, i) => {
			inner.push(
				<li key={i}>
					<h4>{o.description}</h4>
				</li>
			);
		});

		return (
			<div className='asker'>
				<h3>For an accurate answer, please provide more information</h3>
				<ul>{inner}</ul>
			</div>
		);
	}
}));