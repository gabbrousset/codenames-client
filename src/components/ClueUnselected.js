import React, { Component } from "react";

export default class ClueUnselected extends Component {
	handleSelectClick = () => {
		if (this.props.info) {
			this.props.onSelectClick();
		}
	}
	render(){
		let classes;
		if(this.props.visible  || this.props.spymasterView){
			classes += this.props.team ? " visible visible-" + this.props.team : " visible";
			classes += this.props.assassin ? " visible-assassin" : "";
		}
		if (!this.props.info) {
			classes += " clueEmpty";
		}
		return(
			<div className={"clue " + classes} onClick={this.handleSelectClick}>
				<span>
					{this.props.title}
				</span>
			</div>
		);
	}
}