const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const socketIo = require("socket.io");

// const bodyParser = require('body-parser')
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(express.static(path.join(__dirname, '../react-ui/build')));

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

   

app.get('/:id', function (req, res) {
	console.log(':/id')
	// return res.send(req.params.id);
	// res.setHeader('Content-Type', 'application/json');
	//  var id = req.params.id;
	// 	rooms.map((room)=>{
	// 		if(room.id === id) {
	// 		    // res.json(room.id);
	// 			return res.send(room);
	// 		}
	// 	})
	console.log(path.join(__dirname, '../react-ui/build'))
	res.sendFile(path.join(__dirname, '../react-ui/build/index.html'));
});

//recibe un id 
app.get('/room/:id', function (req, res) {
	console.log('room/id')	
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
	console.log(path.join(__dirname, '../react-ui/build'))
	res.sendFile(path.join(__dirname, '../react-ui/build/index.html'));
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
	socket.on('join room', (state) => {
		console.log('sockt join', state.id)
		socket.join(state.id)
		console.log(rooms)
		var i = rooms.findIndex(o => o.id === state.room.id);
		if (rooms[i]) {
				console.log('if')
				socket.emit('joined room', rooms[i]);
			} else {
				 rooms.push(state.room)
				console.log('else', state.room)				 
				 socket.emit('joined room', state.room)
			}
		
		// rooms.map((room) => {
		// 		console.log('maps')			
		// 	if (room.id === id) {
		// 		console.log('si existio el cuarto',room)
		// 		socket.emit('joined room', room);
		// 	}
		// })
	})

	// Cuando se crea un nuevo juego
	socket.on('update game', (room)=> {
		var i = rooms.findIndex(o => o.id === room.id);
		if (rooms[i]) { rooms[i] = room } else { rooms.push(room)}
			io.sockets.in(room.id).emit('game', room.game)
			console.log(rooms)
	})
	socket.on('end game', (room, team)=> {
		var i = rooms.findIndex(o => o.id === room.id);
		if (rooms[i]) { rooms[i] = room} else { rooms.push(room)}
			io.sockets.in(room.id).emit('receive end game', team)
	})
	socket.on('update user list', (room)=> {
		var i = rooms.findIndex(o => o.id === room.id);
		if (rooms[i]) { rooms[i] = room} else { rooms.push(room)}
			io.sockets.in(room.id).emit('room', room)
	})
	socket.on('send message', (roomId, text)=> {
		io.sockets.in(roomId).emit('receive message', text)
	})
	socket.on('send clue', (roomId, spymasterClue)=> {
		io.sockets.in(roomId).emit('receive clue', spymasterClue)
	})
});
const saveRoom = (room) => {
	rooms.push(room)
};
// const addMessage = () => {
	
// };

// const getApiAndEmit = socket => {
// 	const response = new Date();
// 	console.log("si");
// 	// Emitting a new message. Will be consumed by the client
// 	socket.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`Listening on port ${port}`));