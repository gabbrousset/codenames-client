import React, { Component } from "react";
import ClueBoard from "./ClueBoard";
import RightPanel from "./RightPanel";
import { Button } from "semantic-ui-react";
import Confetti from 'react-dom-confetti';

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
		return (
			<div className="App">
				<div className="ui grid game stackable">
					<ClueBoard
						spymasterView={this.props.spymasterView}
						clues={this.props.clues}
						onSelectClick={this.props.onSelectClick}
						team={this.props.user.team}
						turn={this.props.turn}
						endTurn={this.props.endTurn}
						blueCount={this.props.blueCount}
						redCount={this.props.redCount}
						gameActive={this.props.gameActive}
						user={this.props.user}
						sendClue={this.props.sendClue}
						spymasterClue={this.props.spymasterClue}
						teamCount={this.props.teamCount}
						handleNewGame={this.props.handleNewGame}
						handleEndGame={this.props.handleEndGame}
						handleViewToggle={this.props.handleViewToggle}
						handleBackLobby={this.props.handleBackLobby}
					/>
					<RightPanel
						sendMessage={this.props.sendMessage}
						messages={this.props.messages}
						user={this.props.user}
						toggleSpymaster={this.props.toggleSpymaster}
						becomeSpymaster={this.props.becomeSpymaster}
						blueSpymaster={this.props.blueSpymaster}
						redSpymaster={this.props.redSpymaster}
						users={this.props.users}
						joinTeam={this.props.joinTeam}
						switchTeam={this.props.switchTeam}
						changeNameInput ={this.props.changeNameInput}
						game={this.props.room.game}
						blueWins={this.props.blueWins}
						redWins={this.props.redWins}
						blueCount={this.props.blueCount}
						redCount={this.props.redCount}
						gameActive={this.props.gameActive}
					>
					</RightPanel>
				</div>
				<Confetti active={ !this.props?.gameActive && (this.props.user.team === this.props.currentWinner)} config={ this.state.config }/>
			</div>
		)
	}
}