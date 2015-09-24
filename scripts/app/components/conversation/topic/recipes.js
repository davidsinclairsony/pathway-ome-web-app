import assign from 'object-assign';
import base from '../../base';
import React from 'react/addons';

export default React.createClass(assign({}, base, {
	displayName: 'Recipes',
	render: function() {
		let inner = [];

		this.props.data.map((o, i) => {
			inner.push(
				<li key={i}>
					<h3>{o.name}</h3>
					<img src={o.image} alt={o.name} />
					<p>
						{o.ingredientsCount} ingredients,
						{o.servings} servings,
						{Math.round(o.totalCalories)} total calories,
						{Math.round(o.totalWeight)} total weight
					</p>
					<p><a href={o.url} target='_blank'>External Link</a></p>
				</li>
			);
		});

		return (
			<ul className='recipes'>{inner}</ul>
		);
	}
}));