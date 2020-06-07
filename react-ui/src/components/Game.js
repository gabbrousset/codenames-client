import React, { Component } from "react";
import GameDashboard from "./GameDashboard";
import ClueBoard from "./ClueBoard";
import { Button } from "semantic-ui-react";

export default class Game extends Component {
	state={};
	render(){
		let button;
		if (this.props.user.isSpymaster) {
			button = (
				<Button toggle active={this.props.spymasterView} onClick={this.props.handleViewToggle} disabled={!this.props.gameActive}>
					Spymaster
				</Button>
			);
		}
		return (
			<div className="App">
				<GameDashboard
					team={this.props.user.team}
					turn={this.props.turn}
					endTurn={this.props.endTurn}
					blueCount={this.props.blueCount}
					redCount={this.props.redCount}
					gameActive={this.props.gameActive}
					spymasterView={this.props.spymasterView}
				>
				</GameDashboard>
				<ClueBoard
					spymasterView={this.props.spymasterView}
					clues={this.props.clues}
					onSelectClick={this.props.onSelectClick}
				/>
				<div className="bottomDashboard">
					{button}
					<Button onClick={this.props.handleNewGame}>
						New Game
					</Button>
					<Button onClick={this.props.handleEndGame}>
						End Game
					</Button>
					<Button onClick={this.props.handleBackLobby}>
						Show Lobby
					</Button>
				</div>
			</div>
		)
	}
}