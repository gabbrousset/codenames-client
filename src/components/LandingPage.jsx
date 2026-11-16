import React, { Component } from "react";
import LandingButtons from "./LandingButtons";
import JoinGame from "./JoinGame";

export default class LandingPage extends Component {
	state={
		show:"landing buttons",
	};
	
	//Toggle between landing and join buttons
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
	joinGame = () => {
		this.setState({
			show: "join game",
		})
	};
	render(){
		if (this.state.show==="landing buttons") {
			return(
				<LandingButtons
					clickJoinGame={this.handleClickJoinGame}
					// clickCreateGameSession={this.props.clickCreateGameSession}
					history={this.props.history}
				>
				</LandingButtons>
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