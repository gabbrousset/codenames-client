import React, { Component } from "react";
import ClueSelected from "./ClueSelected";
import ClueUnselected from "./ClueUnselected";

export default class Clue extends Component{
	handleSelectClick = () => {
		this.props.onSelectClick(this.props.id, this.props.team, this.props.assassin);
	};
	render(){
		if (this.props.selected === true) {
			return(
				<ClueSelected
					{...this.props}
				/>
			);
		} else {
			return(
				<ClueUnselected
					{...this.props}
	     			spymasterView={this.props.spymasterView}					
					onSelectClick={this.handleSelectClick}
				/>
			);
		}
	}
}