import React, { Component } from "react";

export default class TeamsList extends Component {
	addNameToItem = (user) => {
		return (
			<div className="item" key={user.userId}>
				{user.isSpymaster ? <img className="ui avatar image" src="/eye.png" alt="spyemaster" /> : <img className="ui avatar image" src="/user.png" alt="user" />}
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
			if (user.team === "blue") {
				blueList.push(this.addNameToItem(user));
			} else {
				redList.push(this.addNameToItem(user));
			}
		})

	// console.log("blueList", blueList)
		return(
			<div>
				<div className="teams">
					<div className="blueTeam">
						<span className="blueTitle">
							Blue Team
							<span className="teamWins">
								{this.props.blueWins}
							</span>
						</span>
						<div className="ui middle aligned divided list">
							{blueList}
						</div>
					</div>
					<div className="redTeam">
						<span  className="redTitle">
							Red Team
							<span className="teamWins">
								{this.props.redWins}
							</span>
						</span>
						<div className="ui middle aligned divided list">
							{redList}
						</div>
					</div>
				</div>
			</div>
		);
	}
}