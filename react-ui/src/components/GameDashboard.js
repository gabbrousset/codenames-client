import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export default class GameDashboard extends Component {
	render(){
		const disabled = (this.props.spymasterView || !this.props.gameActive || (this.props.team !== this.props.turn)) ?  true : false;
		return(
		<div className="dashboard">
			<span className="dashboardItems">Scoreboard:
				<span> </span><span className="blueCount">{this.props.blueCount}</span>
					<span> - </span>
				<span className="redCount">{this.props.redCount}</span>
			</span>
			<span  className={"currentTurn dashboardItems " + this.props.turn+"Count"} >{this.props.turn}
				<span>'s Turn</span>
			</span>
			<span className="dashboardItems">
				<Button
				compact size="small"
				color={this.props.turn}
				onClick={this.props.endTurn}
				disabled= {disabled}
				>
					End Turn
				</Button>
			</span>
		 </div>
		);
	}
}