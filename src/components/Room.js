import React, { Component } from "react";
import Game from "./Game";
import Lobby from "./Lobby";
import { Button } from "semantic-ui-react";
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
	openGame =() => {
		this.setState({
			showOpenGame: true,
		});
	};

	// Imported from game
	handleNewGame = () => {
		this.newGame();
	};
	newGame = () => {
		const game = newGame();
		this.setState({
			game : {
				clues: game.clues,
				turn: game.firstTurn,
				gameActive: true,
				blueCount: game.blueCount,
				redCount: game.redCount,
				spymasterView: false,
			}
		});
	};
	endGame = () => {
		this.toggleVisibility();
		this.setState({
			game: {
				gameActive: false,
			}
		})
	};
	handleEndTurn = () => {
		this.endTurn();
	};
	endTurn = () => {
		if (this.state.game.turn === "red") {
			this.setState({
				game: {
					turn: "blue",
				}
		})
		} else {
			this.setState({
				game: {
					turn: "red",
				}
			})
		}
	};
	reduceCount = (clueTeam) => {
		const teamCount = clueTeam + "Count";
		this.setState({
				[teamCount]: this.state.game[teamCount] - 1},
				() => this.shouldGameEnd(teamCount)
		)
	};
	shouldGameEnd = (teamCount) => {
		if (this.state.game[teamCount]===0) {
			this.endGame();
		}
	};
	handleSelectClick = (clueId, clueTeam, isAssassin) => {		
		// Revisa si no eres spymaster
		if (!this.state.game.spymasterView && this.state.game.gameActive ) {
		// Entonces muestras la pista
			this.revealClue(clueId);
			// count
			//revisas si clueTeam no es vacio
				//mandas llamar reduceCount, le pasas el clueTeam
					//revisas si tienes que terminar el juego

			// reduceCount, recibe team
				//ternary, para saber cual reducir
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
		this.setState({
			game: {
				clues: this.state.game.clues.map((clue) => {
					if (clueId === clue.id) {
						return Object.assign({}, clue, {
							selected: true,
						})
					} else {
						return clue;
					}
				})
			}
		});
	};
	handleViewToggle = () =>{
		this.toggleVisibility();
	 	this.setState((prevState) => ({ spymasterView: !prevState.spymasterView }));
	 };
	 toggleVisibility = () =>{
	 	this.setState({
	 		game: {
		 		clues: this.state.game.clues.map((clue) => {
		 			return Object.assign({}, clue, {
		 				visible: !this.state.game.spymasterView
		 			})
		 		})
		 	}
	 	});
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
					blueCount={this.state.game.blueCount}
					redCount={this.state.game.redCount}
					gameActive={this.state.game.gameActive}
					spymasterView={this.state.game.spymasterView}
					clues={this.state.game.clues}
					onSelectClick={this.handleSelectClick}
					handleViewToggle={this.handleViewToggle}
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