import assign from 'object-assign';
import base from '../../base';
import GoogleMaps from 'google-maps';
import mapStyles from '../../../data/mapStyles';
import React from 'react/addons';

export default React.createClass(assign({}, base, {
	displayName: 'Groceries',
	componentDidMount: function() {
		let groceries = Array.prototype.slice.call(
			React.findDOMNode(this).querySelector('ul').children
		);

		groceries.map(o => {
			GoogleMaps.load(function(google) {
				let element = o.querySelector('.map');

				let options = {
					center: {
						lat: parseFloat(element.dataset.lat),
						lng: parseFloat(element.dataset.lng)
					},
					zoom: 15,
					mapTypeControlOptions: {
						mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
					},
					mapTypeControl: false,
					streetViewControl: false,
					zoomControl: true,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.LARGE,
						position: google.maps.ControlPosition.LEFT_TOP
					}
				};

				let styledMap = new google.maps.StyledMapType(
					mapStyles,
					{name: 'Styled'}
				);

				let map = new google.maps.Map(element, options);

				map.mapTypes.set('map_style', styledMap);
				map.setMapTypeId('map_style');

				/*eslint-disable */
				let marker = new google.maps.Marker({
					position: {
						lat: parseFloat(element.dataset.lat),
						lng: parseFloat(element.dataset.lng)
					},
					map: map,
					title: element.dataset.title
				});
				/*eslint-enable */
			});
		});

	},
	render: function() {
		let inner = [];

		this.props.data.map((o, i) => {
			inner.push(
				<li key={i}>
					<div
						className='map'
						data-lat={o.location.lat}
						data-lng={o.location.lng}
						data-title={o.title}
					/>
					<h4>{o.title}</h4>
					<p>{o.openNow? 'Open' : 'Closed'} for business</p>
				</li>
			);
		});

		return (
			<div className='groceries'>
				<h3>Grocery Stores</h3>
				<ul>{inner}</ul>
			</div>
		);
	}
}));