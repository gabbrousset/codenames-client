import React, { Component } from "react";

export default class ClueSelected extends Component {
	render(){
		let classes = this.props.team? " "+this.props.team : "";
		classes += this.props.assassin? " assassin" : "";
		return(
			<div className= {"clue selected" + classes }>
				<span>
					{this.props.title}
				</span>
			</div>
		);
	}
}

