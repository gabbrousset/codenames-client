const express = require('express');
const http = require("http");
const socketIo = require("socket.io");

// const bodyParser = require('body-parser')
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.listen(port);
let interval;

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", (socket) => {
	console.log("New client connected");
	if (interval) {
	clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	socket.on("disconnect", () => {
	console.log("Client disconnected");
	clearInterval(interval);
	});
});

const getApiAndEmit = socket => {
	const response = new Date();
	console.log("si");
	// Emitting a new message. Will be consumed by the client
	socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));