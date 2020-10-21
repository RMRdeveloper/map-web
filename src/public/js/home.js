const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
	const socket = io();
	const map = L.map('map', {
		center: [36.2422994, -113.7487596],
		zoom: 4,
		zoomControl: false,
	});
	const controlScale = L.control
		.scale({
			metric: true,
		})
		.addTo(map);
	const zoomControl = L.control
		.zoom({
			zoomInTitle: 'Acercar',
			zoomOutTitle: 'Alejar',
		})
		.addTo(map);

	const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

	L.tileLayer(tileURL, {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	const geoOptions = {
		enableHighAccuracy: true,
		maximumAge: 0,
		timeout: 5000,
	};

	const animateFly = (coords) => {
		map.flyTo(coords, 13, {
			animate: true,
			duration: 0.8,
		});
	};

	const createRadius = (coords) => {
		const circle = L.circle(coords, { radius: 200 })
			.bindPopup('Alrededor: 200 metros')
			.addTo(map);
	};

	const createMarker = (coords) => {
		const marker = L.marker(coords);
		marker.bindPopup(`Este usuario está en: ${coords[0]}, ${coords[1]}`).addTo(map);
		animateFly(coords);
		createRadius(coords);
	};

	navigator.geolocation.getCurrentPosition(
		(pos) => {
			const coords = [pos.coords.latitude, pos.coords.longitude];
			createMarker(coords);
			socket.emit('userCoordinates', coords);
		},
		(err) => {
			console.log(`Hubo un error: ${err.message}`);
		},
		geoOptions
	);

	socket.on('newUserCoordinates', (coords) => {
		createMarker(coords);
	});

	// const marker = L.marker([18.2375496, -70.2050959]);
	// marker.bindPopup('Estás actualmente en ésta posición.').addTo(map);
});
