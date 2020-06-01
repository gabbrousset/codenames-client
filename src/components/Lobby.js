import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export default class Lobby extends Component {
	state={
		users: [
			{
				id: 1,
				name: "",
				team: "blue",
				spymaster: true,
			},
		],
	}
	
	// update user name

	// add user to users
		//  add user to team?



	render(){
		return(
			<div>
				// if ! this.state.user.name muestra input para nombre
					//clickHandler, save user name
				// Lista de usuarios con map, para mostrar el nombre, el color del equipo, y si es spymaster un icono
				<div className="landingButtons">
					<Button
						color="blue"
						size="massive"
						onClick={this.props.openNewGame}
					>
						Start
					</Button>
				</div>
			</div>
		);
	}
}