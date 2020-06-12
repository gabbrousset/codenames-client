import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

export default class SpymasterClue extends Component {
	state={
		clue: "",
	};
	handleChangeClue = (clue) => {
		this.setState({clue: clue.target.value})
	};
	handleSendClue = (e) => {
		e.preventDefault();
		const clue = this.state.clue;
		this.setState({
			clue: "",
		})
		this.props.sendClue(clue);
		console.log(clue)
	};
	render(){
		let spymasterClue = this.props.spymasterClue;
		console.log(this.props)
		let content;
		 if (this.props.spymasterClue) {
		 	content =
			<div className="spymasterClue">
				<span className={spymasterClue.color+"Count"}>Current Clue: {spymasterClue.clue}</span>
			</div>
		} else if (this.props.user.isSpymaster && (this.props.user.team===this.props.turn) && this.props.gameActive) {
			content =
			<div className="spymasterClueInput">
				<form  onSubmit={this.handleSendClue}  className="clueInput ui action input">
					<Input type="text" placeholder="Message" className="inputChat" onChange={this.handleChangeClue} value={this.state.clue}></Input>
					<Button type="submit" className="ui button">Send</Button>
				</form>
			</div>
		}
		return(
			<div className="spymasterClueNothing">
				{content}
			</div>
		);
	};
}