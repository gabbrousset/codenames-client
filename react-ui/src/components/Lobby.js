import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Teams from "./Teams";

export default class Lobby extends Component {
	
	// update user name

	// add user to users
		//  add user to team?

// if ! this.state.user.name muestra input para nombre
				// 	clickHandler, save user name
				// Lista de usuarios con map, para mostrar el nombre, el color del equipo, y si es spymaster un icono

	render(){
		let button;
		if (this.props.user.team) {
			if (this.props.game && this.props.game.gameActive) {
			 	button = (
					<div className="rowButtons">
						<Button
							color="red"
							size="massive"
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
							size="massive"
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
					becomeSpymaster={this.props.becomeSpymaster}
					blueSpymaster={this.props.blueSpymaster}
					redSpymaster={this.props.redSpymaster}
					user={this.props.user}
					users={this.props.users}
					joinTeam={this.props.joinTeam}
					switchTeam={this.props.switchTeam}
					changeNameInput ={this.props.changeNameInput}
					game={this.props.room.game}
				/>
				{button}
			</div>
		)
	}
}