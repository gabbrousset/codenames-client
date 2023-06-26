import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Teams from "./Teams";

export default class Lobby extends Component {
	leaveRoom = () => {
		 this.props.history.push({
		 	pathname: '/',
		 })
	};
	render(){
		let button;
		if (this.props.user.team) {
			if (this.props.game && this.props.game.gameActive) {
			 	button = (
					<div className="rowButtons">
						<Button
							color="red"
							size="big"
							onClick={this.props.showGame}
						>
							Show Game
						</Button>
					</div>
				)
			} else {
			 	button = (
					<div className="rowButtons">
						<Button
							color="blue"
							size="big"
							onClick={this.props.shuffleTeams}
						>
							Shuffle
						</Button>
						<Button
							color="blue"
							size="big"
							onClick={this.props.openNewGame}
						>
							Start
						</Button>
					</div>
				)
			}
		}
		return (
			<div>
				<Teams
					toggleSpymaster={this.props.toggleSpymaster}
					becomeSpymaster={this.props.becomeSpymaster}
					blueSpymaster={this.props.blueSpymaster}
					redSpymaster={this.props.redSpymaster}
					user={this.props.user}
					users={this.props.users}
					joinTeam={this.props.joinTeam}
					switchTeam={this.props.switchTeam}
					changeNameInput ={this.props.changeNameInput}
					game={this.props.room.game}
					blueWins={this.props.blueWins}
					redWins={this.props.redWins}
				/>
				{button}
				<div className="rowButtons">
					<Button
						color="grey"
						size="mini"
						onClick={this.leaveRoom}
					>
						Leave Room
					</Button>
				</div>
			</div>
		)
	}
}