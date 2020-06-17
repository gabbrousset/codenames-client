import React, { Component } from "react";
import GameDashboard from "./GameDashboard";
import SpymasterClue from "./SpymasterClue"
import Clue from "./Clue";
import { Button } from "semantic-ui-react";

export default class ClueBoard extends Component {
	render(){
		let spymasterButton;
		if (this.props.user.isSpymaster) {
			spymasterButton = (
				<Button toggle active={this.props.spymasterView} onClick={this.props.handleViewToggle} disabled={!this.props.gameActive}>
					Spymaster
				</Button>
			);
		}
		let button;
		if (this.props.gameActive) {
			button = (
				<Button onClick={this.props.handleEndGame} disabled={!this.props.user.team} >
					End Game
				</Button>
			);
		} else {
			button = (
				<Button onClick={this.props.handleNewGame} disabled={!this.props.user.team} >
					New Game
				</Button>
			);
		}
		return(
			<div className="boardGame ten wide column">
				<div className="dashboard stackable">
					<div className="dashboardSpymaster">
						<SpymasterClue
							user={this.props.user}
							sendClue={this.props.sendClue}
							spymasterClue={this.props.spymasterClue}
							turn={this.props.turn}
							gameActive={this.props.gameActive}
							teamCount={this.props.teamCount}
						/>
					</div>
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
				</div>
				<div className="ui centered grid clueBoard">
					{this.props.clues &&
						this.props.clues.map((clue) => (
							<div className="four wide column" key={clue.id}>
								<Clue
						 			{...clue}
						 			onSelectClick={this.props.onSelectClick}
						 			spymasterView={this.props.spymasterView}
						 		/>
							</div>
						))
					}
				</div>
				<div className="bottomDashboard">
					{spymasterButton}
					{button}
					<Button onClick={this.props.handleBackLobby} >
						Show Lobby
					</Button>
				</div>
			</div>
		);
	}
}