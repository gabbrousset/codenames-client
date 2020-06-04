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
	 var id = req.params.id;
		rooms.map((room)=>{
			if(room.id === id) {
			    res.json(room.id);
				// return res.send(JSON.stringify(room));
			}
		})
	// res.send('error')
});

app.post('/room/create', function(req, res) {
	saveRoom(req.body);
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
	
	// Cuando se crea un nuevo cuarto
	// socket.on("created room", (room)=>{
	// 	saveRoom(room);
	// })

	// Cuando un usuario se conecta al cuarto
	socket.on('joined room', (id) => {
		socket.join(id)
		rooms.map((room) => {
			if (room.id === id) {
				socket.emit('update room', room);
			}
		})
	})

	// Cuando se crea un nuevo juego
	socket.on('new game', (r)=> {
		var i = rooms.findIndex(o => o.id === r.id);
		if (rooms[i]) { rooms[i] = r} else { rooms.push(r)}
			socket.broadcast.to(r.id).emit('update room', r)
	})
	
	socket.on('game update', (room)=> {
		var i = rooms.findIndex(o => o.id === room.id);
		if (rooms[i]) { rooms[i] = room} else { rooms.push(room)}
			socket.broadcast.to(room.id).emit('update game', room.game)
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