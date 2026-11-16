import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { newRoom} from "../helpers";

export default class LandingButtons extends Component {
	handleClickCreateGameSession = () => {
		// const game = newGame();
		const room = newRoom();
		this.props.history.push(room.id)
		// this.props.clickCreateGameSession(game)
	};
	render(){
		return(
			<div className="columnButtons">
				<Button
					color="blue"
					size="massive"
					onClick={this.handleClickCreateGameSession}
				>
					New Game
				</Button>
				<Button
					color="red"
					size="massive"
					onClick={this.props.clickJoinGame}
				>
					Join Game
				</Button>
			</div>
		);
	}
}