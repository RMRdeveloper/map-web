let usuariosConectados = 0;

module.exports = (io) => {
	io.on('connection', (socket) => {
		usuariosConectados++;
		console.log(`Hay ${usuariosConectados} usuarios conectados`);
		socket.on('userCoordinates', (coords) => {
			// console.log(coords);
			socket.broadcast.emit('newUserCoordinates', coords);
		});
		socket.on('disconnect', () => {
			usuariosConectados--;
			console.log(`Un usuario se desconectó, quedan: ${usuariosConectados}`);
		});
	});
};
