import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export default class GameDashboard extends Component {
	render(){
		const disabled = (this.props.spymasterView || !this.props.gameActive || (this.props.team != this.props.turn)) ?  true : false;
		return(
		<div  className="dashboard">
			<span>Scoreboard: 
				<span className="blueCount">{this.props.blueCount}</span>
					<span> - </span>
				<span className="redCount">{this.props.redCount}</span>
			</span>
			<span>Current Turn: 
				<span  className="currentTurn">{this.props.turn}</span>
			</span>
			<Button
			compact size="small"
			color={this.props.turn}
			onClick={this.props.endTurn}
			disabled= {disabled}
			>
				End Turn
			</Button>
		 </div>
		);
	}
}