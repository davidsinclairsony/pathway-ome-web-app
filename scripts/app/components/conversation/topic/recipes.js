import assign from 'object-assign';
import base from '../../base';
import React from 'react';

export default React.createClass(assign({}, base, {
	displayName: 'Recipes',
	render: function() {
		let inner = [];

		this.props.data.map((o, i) => {
			inner.push(
				<li key={i}>
					<img src={o.image} alt={o.name} />
					<div className='content'>
						<h4>{o.name}</h4>
						<p>
							{o.ingredientsCount} ingredients,
							{' ' + o.servings} servings,
							{' ' + Math.round(o.totalCalories)} total calories,
							{' ' + Math.round(o.totalWeight)} total weight
						</p>
						<p><a href={o.url} target='_blank'>External Link ➜</a></p>
					</div>
				</li>
			);
		});

		return (
			<div className='recipes'>
				<h3>Recipes</h3>
				<ul>{inner}</ul>
			</div>
		);
	}
}));