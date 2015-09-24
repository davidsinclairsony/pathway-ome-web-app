import assign from 'object-assign';
import base from '../../base';
import React from 'react/addons';

export default React.createClass(assign({}, base, {
	displayName: 'Places',
	render: function() {
		let inner = [];

		this.props.data.map((o, i) => {
			inner.push(
				<li key={i}>
					<h3>{o.title}</h3>
					<p>Lat: {o.location.lat}, Long: {o.location.lng}</p>
					<p>There are {o.menuItems.length} items on the menu</p>
				</li>
			);
		});

		return (
			<ul className='places'>{inner}</ul>
		);
	}
}));