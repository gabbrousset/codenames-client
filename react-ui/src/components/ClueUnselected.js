import React, { Component } from "react";

export default class ClueUnselected extends Component {
	render(){
		let classes;
		if(this.props.visible  || this.props.spymasterView){
			classes += this.props.team ? " visible visible-" + this.props.team : " visible";
			classes += this.props.assassin ? " visible-assassin" : "";
		}
		return(
			<div className={"clue " + classes} onClick={this.props.onSelectClick}>
				<span>
					{this.props.title}
				</span>
			</div>
		);
	}
}