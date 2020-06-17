import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Chat from "./Chat";
import TeamsPanel from "./TeamsPanel";

export default class RightPanel extends Component {
	state={
		message: "",
	};
	render(){
		return(
			<div className="rightPanel four wide column">
				<Chat
					sendMessage={this.props.sendMessage}
					messages={this.props.messages}
					user={this.props.user}
				>
				</Chat>
				<TeamsPanel
					toggleSpymaster={this.props.toggleSpymaster}
					becomeSpymaster={this.props.becomeSpymaster}
					blueSpymaster={this.props.blueSpymaster}
					redSpymaster={this.props.redSpymaster}
					user={this.props.user}
					users={this.props.users}
					joinTeam={this.props.joinTeam}
					switchTeam={this.props.switchTeam}
					changeNameInput ={this.props.changeNameInput}
					game={this.props.game}
					blueWins={this.props.blueWins}
					redWins={this.props.redWins}
					blueCount={this.props.blueCount}
					redCount={this.props.redCount}
					gameActive={this.props.gameActive}
				>
				</TeamsPanel>
				<div className="rightPanelButtons">
					<Button
						color="grey"
						size="large"
						onClick={this.props.shuffleTeams}
					>
						Shuffle Teams
					</Button>
				</div>
			</div>
		);
	};
}