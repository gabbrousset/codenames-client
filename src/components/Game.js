import React, { Component } from "react";
import GameDashboard from "./GameDashboard";
import ClueBoard from "./ClueBoard";
import { Button } from "semantic-ui-react";

export default class Game extends Component {
	state={};
	render(){
		return (
			<div className="App">
				<GameDashboard
					turn={this.props.turn}
					endTurn={this.props.endTurn}
					blueCount={this.props.blueCount}
					redCount={this.props.redCount}
					gameActive={this.props.gameActive}
					spymasterView={this.props.spymasterView}
				>
				</GameDashboard>
				<ClueBoard
					clues={this.props.clues}
					onSelectClick={this.props.onSelectClick}
				/>
				<div className="bottomDashboard">
					<Button toggle active={this.props.spymasterView} onClick={this.props.handleViewToggle} disabled={!this.props.gameActive}>
						Spymaster
					</Button>
					<Button onClick={this.props.handleNewGame}>
						New Game
					</Button>
				</div>
			</div>
		)
	}
}