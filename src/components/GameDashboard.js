import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export default class GameDashboard extends Component {
	render(){
		const disabled = (!this.props.gameActive || (this.props.team !== this.props.turn)) ?  true : false;
		return(
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
		);
	}
}