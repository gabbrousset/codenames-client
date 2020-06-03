import React, { Component } from "react";
import Game from "./Game";
import Lobby from "./Lobby";
import { newGame } from '../helpers';

export default class Room extends Component {
	state={
		showOpenGame: false,
		game: {
			clues:[]
		 }
	};

	// Toggle between game and lobby
	handleOpenNewGame = () => {
		this.openGame();
	};
	openGame = () => {
		this.setState({
			showOpenGame: true,
		});
	};
	handleBackLobby = () => {
		this.openLobby();
	}
	openLobby = () => {
		this.setState({
			showOpenGame: false,
		})
	}
	// Imported from game
	handleNewGame = () => {
		this.newGame();
	};
	newGame = () => {
		const gameInfo = newGame();
		this.setState({
			game: {
				clues: gameInfo.clues,
				turn: gameInfo.firstTurn,
				gameActive: true,
			},
			blueCount: gameInfo.blueCount,
			redCount: gameInfo.redCount,
			spymasterView: false,
		});
	};
	endGame = () => {
		this.toggleVisibility();
		this.setState(Object.assign(this.state.game, {gameActive: false,}));
	};
	handleEndTurn = () => {
			this.endTurn();
	};
	endTurn = () => {
		if (this.state.game.turn === "red") {
			this.setState(Object.assign(this.state.game, {turn: "blue",}));
		} else {
			this.setState(Object.assign(this.state.game, {turn: "red",}));
		}
	};
	reduceCount = (clueTeam) => {
		const teamCount = clueTeam + "Count";
		this.setState({
			[teamCount]: this.state[teamCount] - 1},
			() => this.shouldGameEnd(teamCount)
		)
	};
	shouldGameEnd = (teamCount) => {
		if (this.state[teamCount]===0) {
			this.endGame();
		}
	};
	handleSelectClick = (clueId, clueTeam, isAssassin) => {		
		// Revisa si no eres spymaster
		if (!this.state.spymasterView && this.state.game.gameActive ) {
		// Entonces muestras la pista
			this.revealClue(clueId);
			if(clueTeam) {
				this.reduceCount(clueTeam);
			}	
			if (isAssassin) {
				this.endGame();
			}
			if (clueTeam !== this.state.game.turn) {
				this.endTurn();
			}			
		}
	};
	revealClue = (clueId) => {
		this.state.game.clues.map((clue) => {
			if (clueId === clue.id) {
				this.setState(Object.assign(clue, {selected: true,}))
			}
		})
	};
	handleViewToggle = () =>{
		this.toggleVisibility();
	 	this.setState((prevState) => ({ spymasterView: !prevState.spymasterView }));
	 };
	 toggleVisibility = () =>{
	 	this.state.game.clues.map((clue) => {
		 	this.setState(Object.assign(clue, {visible: !this.state.spymasterView,}))
		})
	 };
	 componentDidMount(){
		this.newGame();
	 };

	render(){
		if (this.state.showOpenGame){
			return(
				<Game
					handleNewGame={this.handleNewGame}
					turn={this.state.game.turn}
					endTurn={this.endTurn}
					blueCount={this.state.blueCount}
					redCount={this.state.redCount}
					gameActive={this.state.game.gameActive}
					spymasterView={this.state.spymasterView}
					clues={this.state.game.clues}
					onSelectClick={this.handleSelectClick}
					handleViewToggle={this.handleViewToggle}
					handleBackLobby={this.handleBackLobby}
				>
				</Game>
			);
		} else {
			return(
				<Lobby
					openNewGame={this.handleOpenNewGame}
					roomId={this.props.match.params.id}
				>
				</Lobby>
			);
		}
	}
}