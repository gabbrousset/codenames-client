import React, { Component } from "react";
import LandingButtons from "./LandingButtons";
import NewGame from "./NewGame";
import JoinGame from "./JoinGame";
import { Button } from "semantic-ui-react";

export default class LandingPage extends Component {
	state={
		show:"landing buttons",
	};
	
	//Toggle between landing, join and create buttons
	handleClickNewGame= () => {
		this.newGame();
	};
	handleClickJoinGame= () => {
		this.joinGame();
	};
	handleClickLandingButtons= () => {
		this.landingButtons();
	};
	landingButtons = () => {
		this.setState({
			show: "landing buttons"
		});
	};
	newGame = () => {
		this.setState({
			show: "new game",
		})
	};
	joinGame = () => {
		this.setState({
			show: "join game",
		})
	};
	render(){
		if (this.state.show==="landing buttons") {
			return(
				<LandingButtons
					clickNewGame={this.handleClickNewGame}
					clickJoinGame={this.handleClickJoinGame}
				>
				</LandingButtons>
			);
		} else if (this.state.show==="new game") {
			return(
				<NewGame
					clickLandingButtons={this.handleClickLandingButtons}
					clickCreateGameSession={this.props.clickCreateGameSession}
				>
				</NewGame>
			);
		} else if (this.state.show==="join game") {
			return(
				<JoinGame
					clickLandingButtons={this.handleClickLandingButtons}
				>
				</JoinGame>
			);
		};
	};
};