import React, { Component } from "react";
import Game from "./Game";
import Lobby from "./Lobby";
import { Button } from "semantic-ui-react";

export default class LandingPage extends Component {
	state={
		showOpenGame: false,
	}
	handleOpenNewGame = () => {
		this.openGame();
	};
	openGame =() => {
			this.setState({
			showOpenGame: true,
					});
	};
	render(){
		if (this.state.showOpenGame){
			return(
				<Game>
				</Game>
			);
		} else {
			return(
				<Lobby
					openNewGame={this.handleOpenNewGame}
				>
				</Lobby>
			);
		}
	}
}