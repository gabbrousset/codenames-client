import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import {newRoom} from "../helpers";

export default class NewGame extends Component {
	state={
		username: "",
	};
	handleChangeNameInput = (name) => {
		this.setState({username: name.target.value});
	};
	handleClickCreateGameSession = () => {
		if (this.state.username) {
			const room = newRoom();
			this.props.history.push(room.id)
			this.props.clickCreateGameSession(room)
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
				<div className="joinGameError">
					{this.state.errorMsg ? <span>{this.state.errorMsg}</span> : '' }
				</div>
				<div className="rowButtons">
					<Button
						color="blue"
						size="massive"
						onClick={this.handleClickCreateGameSession}
					>
						Create
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