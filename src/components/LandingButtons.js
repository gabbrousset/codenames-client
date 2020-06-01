import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export default class LandingButtons extends Component {
	state={
	};
	render(){
		return(
			<div className="columnButtons">
				<Button
					color="blue"
					size="massive"
					onClick={this.props.clickNewGame}
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