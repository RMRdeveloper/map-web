const d = document;

d.addEventListener('DOMContentLoaded', (e) => {
	const socket = io();
	const map = L.map('map', {
		center: [18.2375496, -70.2050959],
		zoom: 9,
	});

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

	const createMarker = (coords) => {
		const marker = L.marker(coords);
		marker.bindPopup(`Este usuario está en: ${coords[0]}, ${coords[1]}`).addTo(map);
	};

	navigator.geolocation.getCurrentPosition(
		(pos) => {
			const coords = [pos.coords.latitude, pos.coords.longitude];
			createMarker(coords);
			socket.emit('userCoordinates', coords);
		},
		(error) => {
			alert(`Hubo un error: `, error);
		},
		geoOptions
	);

	socket.on('newUserCoordinates', (coords) => {
		createMarker(coords);
	});

	// const marker = L.marker([18.2375496, -70.2050959]);
	// marker.bindPopup('Estás actualmente en ésta posición.').addTo(map);
});
