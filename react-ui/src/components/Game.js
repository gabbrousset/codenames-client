import React, { Component } from "react";
import GameDashboard from "./GameDashboard";
import SpymasterClue from "./SpymasterClue"
import ClueBoard from "./ClueBoard";
import Chat from "./Chat";
import { Button } from "semantic-ui-react";
import Confetti from 'react-dom-confetti';
// import Lobby from "./Lobby";

// let config = {
// 	angle: "90",
// 	spread: "184",
// 	startVelocity: "60",
// 	elementCount: "78",
// 	dragFriction: 0.1,
// 	duration: "5870",
// 	stagger: "33",
// 	width: "18px",
// 	height: "22px",
// 	colors: this.props?.currentWinner,
// };

export default class Game extends Component {
	state={
		config: {
			angle: "90",
			spread: "184",
			startVelocity: "60",
			elementCount: "78",
			dragFriction: 0.1,
			duration: "5870",
			stagger: "33",
			width: "18px",
			height: "22px",
			colors: ["#f00", "#00f"],
		}
	};
	componentDidMount() {
		let config = this.state.config;
		if (this.props.user.team==="blue") {
			config.colors = ['#154360', '#21618C', '#3498DB' ,'#58CCED', '#12261A0']
		} else {
			config.colors = ['#8B0000', '#FA8072', '#FF0000', '#EA3C53', '#CD5C5C']
		}
		this.setState({config})
	}

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
		return (
			<div className="App">
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
					<SpymasterClue
						user={this.props.user}
						sendClue={this.props.sendClue}
						spymasterClue={this.props.spymasterClue}
						turn={this.props.turn}
						gameActive={this.props.gameActive}
					/>
					<div className="ui grid game stackable">
						<ClueBoard
							spymasterView={this.props.spymasterView}
							clues={this.props.clues}
							onSelectClick={this.props.onSelectClick}
						/>
						<Chat
							sendMessage={this.props.sendMessage}
							messages={this.props.messages}
							user={this.props.user}
						>
						</Chat>
					</div>
					<Confetti active={ !this.props?.gameActive && (this.props.user.team === this.props.currentWinner)} config={ this.state.config }/>
					<div className="bottomDashboard">
						{spymasterButton}
						{button}
						<Button onClick={this.props.handleBackLobby} >
							Show Lobby
						</Button>
					</div>
			</div>
		)
	}
}