import React, { Component } from "react";
import uuid from "uuid";
import GameDashboard from "./GameDashboard";
import SpymasterClue from "./SpymasterClue"
import Clue from "./Clue";
import { Button } from "semantic-ui-react";

export default class ClueBoard extends Component {
	render(){
		let clueBoard = []
		if (this.props.clues) {
			this.props.clues.map((clue) => (
				clueBoard.push(
				<div className="four wide column" key={clue.id}>
					<Clue
			 			{...clue}
			 			onSelectClick={this.props.onSelectClick}
			 			spymasterView={this.props.spymasterView}
			 			info={true}
			 		/>
				</div>
			)))
		} else {
			for(let i = 0; i < 24; i++){
				clueBoard.push(<div className="four wide column" key={uuid.v4()}>
					<Clue
						info={false}
					/>
				</div>)
			}
		}
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
{/*				<div className="ui centered grid clueBoard">
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
*/}
				<div className="ui centered grid clueBoard">
					{clueBoard}
				</div>
				<div className="bottomDashboard">
					<Button
						color="grey"
						onClick={this.props.leaveRoom}
					>
						Leave Room
					</Button>
					{button}
					{spymasterButton}
				</div>
			</div>
		);
	}
}