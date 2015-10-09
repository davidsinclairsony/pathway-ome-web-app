import assign from 'object-assign';
import base from '../../base';
import React from 'react';

export default React.createClass(assign({}, base, {
	displayName: 'Watson',
	render: function() {
		let inner = [];

		this.props.data.map((o, i) => {
			if(i < 1) {
				inner.push(
					<li key={i}>
						<div className='content'>
							<div
								className='formattedText'
								dangerouslySetInnerHTML={{__html: o.formattedText}}
							/>
							<div className='confidence'>
								{Math.floor(o.confidence * 100)}% confidence rating
							</div>
						</div>
					</li>
				);
			}
		});

		return (
			<div className='watson'>
				<ul>{inner}</ul>
			</div>
		);
	}
}));