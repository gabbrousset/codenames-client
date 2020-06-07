import React, { Component } from "react";

export default class TeamsList extends Component {
	addNameToItem = (user) => {
		return (
			<div className="item" key={user.userId}>
				<div className="content">
					{user.name}
				</div>
			</div>
		);
	};

	render(){
		let blueList = [];
		let redList = [];
		this.props.users.map((user) => {
			// user.team === 'blue' ? this.addNameToItem(user.name) : this.addNameToItem(user.name)
			if (user.team === "blue") {
				blueList.push(this.addNameToItem(user));
			} else {
				redList.push(this.addNameToItem(user));
			}
		})

	// console.log("blueList", blueList)
		return(
			<div>
				<span className="centerText">
					Teams
				</span>
				<div className="teams">
					<div className="blueTeam">
						<span className="blueTitle">Blue Team</span>
						<div className="ui middle aligned divided list">
							{blueList}
						</div>
					</div>
					<div className="redTeam">
						<span  className="redTitle">Red Team</span>
						<div className="ui middle aligned divided list">
							{redList}
						</div>
					</div>
				</div>
			</div>
		);
	}
}