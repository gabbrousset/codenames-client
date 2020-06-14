import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

export default class SpymasterClue extends Component {
	state={
		clue: "",
		selectValue: "",
	};
	handleChangeClue = (clue) => {
		this.setState({clue: clue.target.value})
	};
	handleSendClue = (e) => {
		e.preventDefault();
		const clue = this.state.clue;
		const number = this.state.selectValue;
		this.setState({
			clue: "",
			selectValue: "",
		})
		this.props.sendClue(clue, number);
	};
	handleChange = (e) => {
		this.setState({selectValue: e.target.value})
	}
	render(){
		let spymasterClue = this.props.spymasterClue;
		let content;
		let options = [];
		for(let i = 1; i < (this.props.teamCount + 1); i++){
			options.push(<option value={i}>{i}</option>)
		}
		if (this.props.spymasterClue) {
		 	content =
			<div className="spymasterClue">
				<span className={spymasterClue.color+"Count"}>Current Clue: {spymasterClue.clue} {spymasterClue.number}</span>
			</div>
		} else if (this.props.user.isSpymaster && (this.props.user.team===this.props.turn) && this.props.gameActive) {
			content =
			<div className="spymasterClueInput">
				<form  onSubmit={this.handleSendClue}  className="clueInput ui action input">
					<Input type="text" placeholder="Message" className="inputChat" onChange={this.handleChangeClue} value={this.state.clue}></Input>
						<select
							class="ui compact selection dropdown"
							value={this.state.selectValue} 
							onChange={this.handleChange}
						>
							<option value="">#</option>
							{options}
					</select>
					<Button type="submit" className="ui button" disabled={!this.state.clue || !this.state.selectValue}>Send</Button>
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