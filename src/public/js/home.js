const d = document;

d.addEventListener('DOMContentLoaded', e => {

    const socket = io();
    const map = L.map('map', {
        center: [18.2375496, -70.2050959],
        zoom: 9
    })

    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileURL, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    map.locate({ enableHighAccuracy: true })
    map.on('locationfound', (e) => {
        console.log(e)
        const coords = [e.latlng.lat, e.latlng.lng]
        const marker = L.marker(coords);
        marker.bindPopup('Estás actualmente en esta posición.').addTo(map);
        socket.emit('userCoordinates', e.latlng);
    })

    socket.on('newUserCoordinates', (coords) => {
        const newCoords = [coords.lat, coords.lng]
        const marker = L.marker(newCoords);
        marker.bindPopup('Estás actualmente en esta posición.').addTo(map);
    })

    // const marker = L.marker([18.2375496, -70.2050959]);
    // marker.bindPopup('Estás actualmente en ésta posición.').addTo(map);
})