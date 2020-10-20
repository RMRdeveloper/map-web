module.exports = (io) => {
	io.on('connection', (socket) => {
		socket.on('userCoordinates', (coords) => {
			// console.log(coords);
			socket.broadcast.emit('newUserCoordinates', coords);
		});
	});
};
