import React, { Component } from "react";
import LandingButtons from "./LandingButtons";
import NewGame from "./NewGame";
import JoinGame from "./JoinGame";

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
					clickCreateGameSession={this.props.clickCreateGameSession}
					history={this.props.history}
				>
				</LandingButtons>
			);
		} else if (this.state.show==="new game") {
			return(
				<NewGame
					clickLandingButtons={this.handleClickLandingButtons}
					clickCreateGameSession={this.props.clickCreateGameSession}
					history={this.props.history}
				>
				</NewGame>
			);
		} else if (this.state.show==="join game") {
			return(
				<JoinGame
					clickLandingButtons={this.handleClickLandingButtons}
					history={this.props.history}
					rooms={this.props.rooms}
				>
				</JoinGame>
			);
		};
	};
};