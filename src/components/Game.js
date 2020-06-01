import React, { Component } from "react";
import GameDashboard from "./GameDashboard";
import ClueBoard from "./ClueBoard";
import { Button } from "semantic-ui-react";
import { newGame } from '../helpers';

export default class Game extends Component {
	state={
		clues:[]
	};
	handleNewGame = () => {
		this.newGame();
	};
	newGame = () => {
		const game = newGame();
		this.setState({
			clues: game.clues,
			turn: game.firstTurn,
			gameActive: true,
			blueCount: game.blueCount,
			redCount: game.redCount,
			spymasterView: false,
		});
	};
	endGame = () => {
		this.toggleVisibility();
		this.setState({
			gameActive: false,
		})
	};
	handleEndTurn = () => {
			this.endTurn();
	};
	endTurn = () => {
		if (this.state.turn === "red") {
			this.setState({
			turn: "blue",
		})
		} else {
			this.setState({
			turn: "red",
			})
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
	}
	handleSelectClick = (clueId, clueTeam, isAssassin) => {		
		// Revisa si no eres spymaster
		if (!this.state.spymasterView && this.state.gameActive ) {
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
			if (clueTeam !== this.state.turn) {
				this.endTurn();
			}			
		}
	};
	revealClue = (clueId) => {
		this.setState({
			clues: this.state.clues.map((clue) => {
				if (clueId === clue.id) {
					return Object.assign({}, clue, {
						selected: true,
					})
				} else {
					return clue;
				}
			})
		});
	};
	handleViewToggle = () =>{
		this.toggleVisibility();
	 	this.setState((prevState) => ({ spymasterView: !prevState.spymasterView }));
	 };
	 toggleVisibility = () =>{
	 	this.setState({
	 		clues: this.state.clues.map((clue) => {
	 			return Object.assign({}, clue, {
	 				visible: !this.state.spymasterView
	 			})
	 		})
	 	});
	 };
	 componentDidMount(){
		this.newGame();
	 };
	render(){
		return (
			<div className="App">
				<GameDashboard
					turn={this.state.turn}
					endTurn={this.endTurn}
					blueCount={this.state.blueCount}
					redCount={this.state.redCount}
					gameActive={this.state.gameActive}
					spymasterView={this.state.spymasterView}
				>
				</GameDashboard>
				<ClueBoard
					clues={this.state.clues}
					onSelectClick={this.handleSelectClick}
				/>
				<div className="bottomDashboard">
					<Button toggle active={this.state.spymasterView} onClick={this.handleViewToggle} disabled={!this.state.gameActive}>
						Spymaster
					</Button>
					<Button onClick={this.handleNewGame}>
						New Game
					</Button>
				</div>
			</div>
		)
	}
}