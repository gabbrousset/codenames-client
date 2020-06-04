const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const socketIo = require("socket.io");

// const bodyParser = require('body-parser')
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/ping', function (req, res) {
 return res.send('pong');
});

//recibe un id 
app.get('/room/:id', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	// console.log('hola',req.params.id);
	 var id = req.params.id;
		rooms.map((room)=>{
			// console.log(room, id)
			if(room.id === id) {
				console.log(room)
			    res.json(room);
				// return res.send(JSON.stringify(room));
			}
		})
	// res.send('error')
});

app.post('/room/create', function(req, res) {

})

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.listen(port);
let interval;

const rooms = []

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", (socket) => {
	console.log("New client connected");
	socket.on("created room", (room)=>{
		saveRoom(room);
	})
	socket.on('new game', (r)=> {		

		var i = rooms.findIndex(o => o.id === r.id);
		if (rooms[i]) { rooms[i] = r} else { rooms.push(r)}
		// rooms.map((room) => {
			// if (room.id === r.id) {
				// console.log(typeof(r))
				// CAMBIAR CERO!!!!
				// rooms.concat({...r})
				// rooms[0] = {...r};
			// };
		// })
		console.log(rooms)
		// rooms[0].game = game;
	})
});
const saveRoom = (room) => {
	rooms.push(room)
};

// const getApiAndEmit = socket => {
// 	const response = new Date();
// 	console.log("si");
// 	// Emitting a new message. Will be consumed by the client
// 	socket.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`Listening on port ${port}`));