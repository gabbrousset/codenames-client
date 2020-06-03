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
	};
	openLobby = () => {
		this.setState({
			showOpenGame: false,
		})
	};
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
				blueCount: gameInfo.blueCount,
				gameActive : true,
				redCount: gameInfo.redCount,
			},
			spymasterView: false,			
		});
	};
	endGame = (game) => {
		this.toggleVisibility();
		game.gameActive = false
		this.setState({game});
	};
	handleEndTurn = () => {
		this.endTurn();
	};
	endTurn = (game) => {
		game.turn === "red" ? game.turn = "blue" : game.turn = "red"
		this.setState({game})
	};
	reduceCount = (game, clueTeam) => {
		const teamCount = clueTeam + "Count";
		game[teamCount] = this.state.game[teamCount] -1;
		this.setState({game},()=> this.shouldGameEnd(game,teamCount))
	};
	shouldGameEnd = (game,teamCount) => {
		if (game[teamCount]===0) {
			this.endGame(game);
		}
	};
	handleSelectClick = (clueId, clueTeam, isAssassin) => {		
		// Revisa si no eres spymaster
		if (!this.state.spymasterView && this.state.game.gameActive ) {
		// Entonces muestras la pista
			const game = this.revealClue(clueId);
			if(clueTeam) {
				this.reduceCount(game,clueTeam);
			}	
			if (isAssassin) {
				this.endGame(game);
			}
			if (clueTeam !== this.state.game.turn) {
				this.endTurn(game);
			}			
		}
	};
	revealClue = (clueId) => {
		const game = {...this.state.game}
		game.clues.map((clue) => {
			if (clueId === clue.id) {
				clue.selected=true
			}
		})
		return game;
	};
	handleViewToggle = () =>{
		this.toggleVisibility();
	 	this.setState((prevState) => ({ spymasterView: !prevState.spymasterView }));
	 };
	 toggleVisibility = () =>{
	 	const game = {...this.state.game}
	 	this.state.game.clues.map((clue) => {
	 		clue.visible= !this.state.spymasterView
		})
		this.setState({game});
	 };
	 componentDidMount(){
		this.newGame();
	 };

	render(){
		if (this.state.showOpenGame){
			return(
				<Game
					{...this.state.game}
					handleNewGame={this.handleNewGame}
					endTurn={this.endTurn}
					spymasterView={this.state.spymasterView}
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