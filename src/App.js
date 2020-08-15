import React, {useEffect, useState} from 'react';
import {FormAdd} from 'app/FormAdd';

export const App = () => {
	const [map, setMap] = useState(null);
	const [balloonContentLayout, setBalloonContentLayout] = useState(null);

	useEffect(() => {
		window.addEventListener('load', handleLoadMap);

		return () => {
			window.removeEventListener('load', handleLoadMap);
		};
	}, []);

	useEffect(() => {
		if (map) {
			map.events.add('click', event => {
				if (event) event.preventDefault();

				if (!map.balloon.isOpen()) {
					const coords = event.get('coords');

					const placemark = new window.ymaps.Placemark(coords, {
						coords: coords.join(', '),
					}, {
						balloonContentLayout,
						balloonPanelMaxMapArea: 0,
					});

					map.geoObjects.add(placemark);
				} else {
					map.balloon.close();
				}
			});
			map.geoObjects.events.add('hover', event => {
				if (event) event.preventDefault();
				const coords = event.get('coords');

				if (!map.balloon.isOpen()) {
					map.balloon.open(coords);
				}
			});
		}
	}, [map])

	const handleLoadMap = () => {
		window.ymaps.ready(() => {
			setMap(new window.ymaps.Map(
				'map',
				{
					center: [55.76, 37.64],
					zoom: 7,
				},
			));
		});

		setBalloonContentLayout(window.ymaps.templateLayoutFactory.createClass(
			`<div>
				Наименование: <input name="name">
				Описание: <input name="description">
				Координаты: {{properties.coords}}
			</div>`,
			{
				build: function () {
					balloonContentLayout.superclass.build.call(this);
					document.querySelector('#send').addEventListener('click', () => {});
				},
				clear: function () {
					balloonContentLayout.superclass.clear.call(this);
				},
			}
		));
	};

	return (
		<div className="container">
			<FormAdd map={map} />
			<div id="map" className="map" />
		</div>
	);
};
