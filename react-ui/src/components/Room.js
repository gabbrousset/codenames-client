import React, { Component } from "react";
import Game from "./Game";
import Lobby from "./Lobby";
import { newGame, createUserId } from '../helpers';

import socketIOClient from "socket.io-client";
import { withRouter } from 'react-router-dom'

let ENDPOINT;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	ENDPOINT = "http://127.0.0.1:5000";
} else {
	 ENDPOINT = "https://codename-online.herokuapp.com/";
}
const socket = socketIOClient(ENDPOINT);



class Room extends Component {
	state={
		user: {
			userId: '',
			name: '',
			team: '',
			isSpymaster: false
		},
		room: {
			id: this.props.match.params.id,
			users:[],
			redWins: 0,
			blueWins: 0,
			//timer: false
			blueSpymaster: '',
			redSpymaster: '',
			messages: [],
		},
		id: this.props.match.params.id,
		showGame: true,
		spymasterView: false
	};

	// Toggle between game and lobby
	handleOpenNewGame = () => {
		// this.openGame();
		this.newGame();
		this.openGame();
	};
	handleShowGame = () => {
		this.openGame();
	};
	openGame = () => {
		this.setState({
			showGame: true,
		});
	};
	handleBackLobby = () => {
		this.openLobby();
	};
	openLobby = () => {
		if (this.state.user.spymasterView) {
			this.toggleVisibility();
		}
		this.setState({
			showGame: false,
			spymasterView: false,
		})
	};
	// Imported from game
	handleNewGame = () => {
		this.newGame();
	};
	newGame = () => {
		const gameInfo = newGame();
		let room = this.state.room
		room.game = gameInfo
		socket.emit("update game", room)
	};
	handleEndGame = () => {
		const room = this.state.room
		this.endGame(room);
	};
	endGame = (room, team) => {
		socket.emit('end game', room, team);
	};
	handleEndTurn = () => {
		if (this.state.user.team===this.state.room.game.turn) {
			const room = this.state.room
			this.endTurn(room)
		}
	};
	endTurn = (room) => {
		room.game.turn === "red" ? room.game.turn = "blue" : room.game.turn = "red"
		room.game.spymasterClue=""
		// this.setState({room})
		socket.emit('update game', room);
	};
	reduceCount = (room, clueTeam) => {
		const teamCount = clueTeam + "Count";
		room.game[teamCount] = this.state.room.game[teamCount] -1;
		socket.emit('update game', this.state.room);
		this.shouldGameEnd(room, teamCount, clueTeam)

	};
	shouldGameEnd = (room, teamCount, team) => {
		if (room.game[teamCount]===0) {
			this.endGame(room, team);
		}
	};
	clueName = (clueId, clueTeam) => {
		let clueName;
		const clues = this.state.room.game.clues;
		clues.map((clue) => {
			if (clue.id === clueId) {
				clueName = clue.title
			};
		});
		this.sendMessage("select clue", clueName, this.state.user.team, this.state.user.name, this.state.user.userId, clueTeam);
	};
	handleSelectClick = (clueId, clueTeam, isAssassin) => {
		// Revisa si no eres spymaster
		if (!this.state.user.isSpymaster && this.state.room.game.gameActive && this.state.user.team===this.state.room.game.turn) {
			this.clueName(clueId, clueTeam)
		// Entonces muestras la pista
			const room = this.revealClue(clueId);
			if(clueTeam) {
				this.reduceCount(room,clueTeam);
			}	
			if (isAssassin) {
				let team;
				this.state.room.game.turn === "red" ? team = "blue" : team = "red";
				this.endGame(room, team);
			}
			if (clueTeam !== this.state.room.game.turn) {
				this.endTurn(room);
			}			
		}
	};
	revealClue = (clueId) => {
		const room = {...this.state.room}
		room.game.clues.map((clue) => {
			if (clueId === clue.id) {
				clue.selected=true
			}
		})
		return room;
	};
	handleViewToggle = () =>{
		this.toggleVisibility();
	 	this.setState((prevState) => ({ spymasterView: !prevState.spymasterView }));
	 };
	 toggleVisibility = () =>{
	 	const room = {...this.state.room}
	 	this.state.room.game.clues.map((clue) => {
	 		clue.visible= !this.state.spymasterView
		})
		this.setState({room});
		// this.setState({game}, () => socket.emit('game update', this.state));
	 };
	 handleToggleSpymaster = () => {
		this.toggleSpymaster(this.state.user.team);
	 };
	 toggleSpymaster= (team) => {
	 	const spyTeam = team + "Spymaster"
		this.setState(prevState => {
			let stateCopy = Object.assign({}, prevState); 
			if (this.state.user.isSpymaster) {
				stateCopy.user.isSpymaster = false;
				stateCopy.room[spyTeam] = '';
				var i = stateCopy.room.users.findIndex(o => o.userId === stateCopy.user.userId);
				if (stateCopy.room.users[i]) { stateCopy.room.users[i] = stateCopy.user} else { stateCopy.room.users.push(stateCopy.user)}
			} else {
				stateCopy.user.isSpymaster = true;
				stateCopy.room[spyTeam] = this.state.user.userId;
				var j = stateCopy.room.users.findIndex(o => o.userId === stateCopy.user.userId);
				if (stateCopy.room.users[j]) { stateCopy.room.users[j] = stateCopy.user} else { stateCopy.room.users.push(stateCopy.user)}
			}
			return {...stateCopy};
		}, ()=> socket.emit('update user list', this.state.room));
	 };
	userId = () => {
		const userId = createUserId()
		localStorage.setItem('userId', userId)
		localStorage.setItem('userIdSaved', "true")
		return userId;
	};
	handleShuffleTeams = () => {
		const room = this.state.room;
		// console.log("handle", users)
		this.splitTeams(this.shuffleTeams(room));
	};
	shuffleTeams = (room) => {
		// console.log("shuffle team", users)
		let users = room.users;
		room.users = users.sort(() => 0.5 - Math.random());
		return room;
	};
	splitTeams = (room) => {
		const firstTeam = Math.random() <0.5 ? "blue" : "red";
		const secondTeam = firstTeam === "blue" ? "red" : "blue";
		room.users.map((user, i) => {
			user.team = i & 1 ? secondTeam : firstTeam;
			user.isSpymaster = (i ===0 || i === 1)? true : false;
		})
		room[firstTeam+"Spymaster"]=room.users[0];
		room[secondTeam+"Spymaster"]=room.users[1];
		this.setState({room}, ()=> socket.emit('update user list', this.state.room))
	};
	handleJoinTeam = (team, name) => {
		this.joinTeam(team, name);
	};
	joinTeam = (team, name) => {
		const spyTeam = this.state.user.team + "Spymaster"
		this.setState(prevState => {
			let stateCopy = Object.assign({}, prevState); 
			stateCopy.user.team = team;
			stateCopy.user.name = name;
			if (this.state.user.isSpymaster) {
				stateCopy.user.isSpymaster=false;
				stateCopy.room[spyTeam] = '';
			}
			var i = stateCopy.room.users.findIndex(o => o.userId === stateCopy.user.userId);
			if (stateCopy.room.users[i]) { stateCopy.room.users[i] = stateCopy.user} else { stateCopy.room.users.push(stateCopy.user)}
			return {...stateCopy};
		}, ()=> socket.emit('update user list', this.state.room));
	};
	handleSwitchTeam = () => {
		this.switchTeam()
	};
	switchTeam = () => {
		let team;
		this.state.user.team === "blue" ? team = "red" :  team = "blue"
		this.joinTeam(team, this.state.user.name);
	};
	handleSendClue = (clue) => {
		this.sendClue(clue, this.state.user.team);
		this.sendMessage("spymasterClue", clue, this.state.user.team, this.state.userId)
	};
	sendClue = (clue, color) => {
		const spymasterClue = {
			clue: clue,
			color: color,
		}
		socket.emit('send clue', this.state.room.id, spymasterClue)
	};
	handleSendMessage = (message) => {
		this.sendMessage("message", message, this.state.user.team, this.state.user.name, this.state.user.userId);
	};
	sendMessage = (type, message, color, name, userId, clueColor) => {
		const text = {
			type: type,
			message: message,
			color: color,
			name: name,
			userId: userId,
			timestamp: Date.now(),
			clueColor: clueColor,
		}
		socket.emit('send message', this.state.room.id, text);
	};
	handleChangeNameInput = (name) => {
		// this.changeNameInput(name)
		this.joinTeam(this.state.user.team, name)
	};

	changeNameInput = (name) => {
		// localStorage.setItem('name', name)
		this.setState({
			user: Object.assign({}, this.state.user, {
				name
			})
		}, ()=> socket.emit('update user list', this.state.room))
	};

	getUserInfo = (userId, room) => {
		let u = this.state.user;
		room.users.map((user) => {
			if (user.userId === userId){
				u = user;
			}
		})
		return u;
	};

	getUserFromLocalStorage = () => {
		const user = {
			name: '',
			team: '',
		}
		user.userId = localStorage.getItem('userIdSaved') === "true" ? localStorage.getItem('userId') : this.userId();
		// const user = this.getUserInfo(userId);
		// console.log('useri',user);
		// user.name = localStorage.getItem('name')  ? localStorage.getItem('name') : '';
		this.setState({user}, () => socket.emit('join room', this.state));
	};

	componentDidMount(){
		this.getUserFromLocalStorage();
		socket.on('joined room', (room) => {
			const user = this.getUserInfo(this.state.user.userId, room);
			this.setState(prevState => {
				let stateCopy = Object.assign({}, prevState);
				stateCopy.room = room;
				stateCopy.user = user;
				return {...stateCopy};
			})
		})
		socket.on('game', (game) => {
			this.setState(prevState => {
				let room = Object.assign({}, prevState.room);
				room.game = game
				return { room };
			})
		})
		socket.on('receive end game', (team) => {
			let room = this.state.room
			this.toggleVisibility();
			if (team) {
				const teamWins = team + "Wins";
				room[teamWins]++;
				room.game.currentWinner = team;
			}
			room.game.gameActive = false;
			room.game.spymasterClue="";
			this.setState({ room })
		})
		socket.on('room', (room) => {
			let user = this.state.user
			room.users.map((u)=> {
				if (u.userId === user.userId){
					user = u;
				};
			})
			this.setState({user, room})
		})
		socket.on('receive message', (text) => {
			this.setState(prevState => {
				let room = Object.assign({}, prevState.room);
				room.messages.push(text)
				return { room };
			  })
		})
		socket.on('receive clue', (spymasterClue) => {
			this.setState(prevState => {
				let room = Object.assign({}, prevState.room);
				room.game.spymasterClue = spymasterClue;
				return { room };
			  }, () => console.log("state", this.state))
		})
	};
	render(){
		if (this.state.showGame && this.state.room.game){
			return(
				<div>
					<div className="shareLink">
						<span>Share this link to play with your friends: <a href="google.com">https://codename-online.herokuapp.com{this.props.history.location.pathname}</a></span>
					</div>
					<Game
						{...this.state.room.game}
						user={this.state.user}
						sendClue={this.handleSendClue}
						spymasterClue={this.state.room.game.spymasterClue}
						messages={this.state.room.messages}
						sendMessage={this.handleSendMessage}
						handleNewGame={this.handleNewGame}
						endTurn={this.handleEndTurn}
						spymasterView={this.state.spymasterView}
						onSelectClick={this.handleSelectClick}
						handleViewToggle={this.handleViewToggle}
						handleBackLobby={this.handleBackLobby}
						handleEndGame={this.handleEndGame}
						currentWinner={this.state.room.game.currentWinner}
					>
					</Game>
				</div>
			);
		} else {
			return(
				<div>
					<div className="shareLink">
						<span>Share this link to play with your friends: <a href={"https://codename-online.herokuapp.com"+this.props.history.location.pathname}>codename-online.herokuapp.com{this.props.history.location.pathname}</a></span>
					</div>
					<Lobby
						shuffleTeams={this.handleShuffleTeams}
						toggleSpymaster={this.handleToggleSpymaster}
						history={this.props.history}
						room={this.state.room}
						blueSpymaster={this.state.room.blueSpymaster}
						redSpymaster={this.state.room.redSpymaster}
						game={this.state.room.game}
						users={this.state.room.users}
						user={this.state.user}
						showGame={this.handleShowGame}
						openNewGame={this.handleOpenNewGame}
						roomId={this.props.match.params.id}
						joinTeam={this.handleJoinTeam}
						switchTeam={this.handleSwitchTeam}
						changeNameInput = {this.handleChangeNameInput}
						blueWins = {this.state.room.blueWins}
						redWins = {this.state.room.redWins}
					>
					</Lobby>
				</div>
			);
		}
	}
}

export default withRouter(Room);