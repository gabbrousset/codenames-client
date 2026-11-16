import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import socket from "../socket";

export default class LandingButtons extends Component {
	state = {
		errorMsg: "",
	};
	handleClickCreateGameSession = () => {
		// The server picks the room id.
		socket.timeout(5000).emit("create room", (err, res) => {
			if (!err && res && res.ok) {
				this.props.history.push("/" + res.id);
			} else {
				this.setState({ errorMsg: "Could not create a room, try again later" });
			}
		});
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
				<div className="joinGameError">
					{this.state.errorMsg ? <span>{this.state.errorMsg}</span> : ''}
				</div>
			</div>
		);
	}
}
