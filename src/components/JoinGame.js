import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

export default class JoinGame extends Component {
	state={
		username: "",
		inputRoomId: "",
		errorMsg: "",
	};
	handleChangeNameInput = (name) => {
		this.setState({username: name.target.value});
	};
	handleChangeRoomInput = (roomId) => {
		this.setState({inputRoomId: roomId.target.value});
	};
	handleClickJoinGameSession = () => {
		if (this.state.username) {
			this.props.rooms.map((room) => {
				if (room.id === this.state.inputRoomId) {
					this.props.history.push(room.id)
				} else {
				this.setState({
					errorMsg: "Room does not exist"
				})
			}
			})
		} else {
			this.setState({
				errorMsg: "Please enter a name"
			})
		}
	};


	render(){
		return(
			<div>
				<div className="input-top">
					<Input
						placeholder="Name"
						size="massive"
						onChange={this.handleChangeNameInput}
					/>
				</div>
				<div className="input-bottom">
					<Input
						placeholder="Room ID"
						size="massive"
						onChange={this.handleChangeRoomInput}
					/>
				</div>
				<div className="joinGameError">
					{this.state.errorMsg ? <span>{this.state.errorMsg}</span> : '' }
				</div>
				<div className="rowButtons">
					<Button
						color="blue"
						size="massive"
						onClick={this.handleClickJoinGameSession}
					>
						Join
					</Button>
					<Button
						color="grey"
						size="massive"
						onClick={this.props.clickLandingButtons}
					>
						Back
					</Button>
				</div>
			</div>
		);
	}
}