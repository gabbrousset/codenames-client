import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import TeamsList from "./TeamsList"

export default class Teams extends Component {
	state ={
		name: '',
		changeName: false,
	};
	handleJoinBlue = () => {
		this.joinTeam("blue", this.state.name)
		// this.handleSubmitNameInput();
	};
	handleJoinRed = () => {
		this.joinTeam("red", this.state.name)
		// this.handleSubmitNameInput();
	};
	joinTeam = (team, name) => {
		this.props.joinTeam(team, name);
		// this.handleSubmitNameInput();
	};
	handleChangeNameInput = (name) => {
		this.setState({name: name.target.value})
	};
	handleSubmitNameInput = () => {
		this.setState({
			changeName: false,
		})
		this.props.changeNameInput(this.state.name);
	};
	openChangeName = () => {
		this.setState({
			changeName: true,
		})
	};
	becomeSpymaster = () => {
		this.props.becomeSpymaster();
	};
	// teamSpymaster = () => {
	// 	const teamSpy = this.props.user.team + "Spymaster";
	// 	if (this.props[teamSpy]) {
	// 		this.setState({

	// 		})
	// 	}
	// };
	render(){

		const teamSpy = this.props.user.team + "Spymaster";
		console.log('hank',this.props)
		console.log('hank',this.props.room?.game?.gameActive)
		let button;
			if(this.props.user.team) {
				if (this.state.changeName){
				// change name (cuando ya tienes equipo)
					button = (
						<div className=" ui action input" id="nameLobby">
				 			<Input type="text" placeholder="name" value={this.state.name} size="big" onChange={this.handleChangeNameInput} />
				 			<Button className="ui button" onClick={this.handleSubmitNameInput} disabled={!this.state.name}>Submit</Button>
				 		</div>
				 	);
				} else {
					// botones switch y spymaster y change name (cuando ya tienes equipo y nombre)
					if(!this.props.game?.gameActive){
					button = (
						<div className="rowButtons">
							<div>
								<Button color="grey" size="large" onClick={this.props.switchTeam} >Switch Team</Button>
							</div>
							<div>
								<Button color={this.props.user.team} size="large" onClick={this.becomeSpymaster} disabled={this.props[teamSpy]} >Become Spymaster</Button>
							</div>
							<div>
								<Button color="grey" size="large" onClick={this.openChangeName} >Change Name</Button>
							</div>
						</div>
					);
					}
				}
			} else {
				// submit name y join teams (no tienes equipo)
				button = (
					<div>
						<div className=" ui action input" id="nameLobby">
							<Input type="text" placeholder="Name" size="big" onChange={this.handleChangeNameInput} />
						</div>
						<div className="joinTeamButtons">
			 				<Button color="blue" size="big" onClick={this.handleJoinBlue} disabled={!this.state.name}>Join Blue Team</Button>
			 				<Button color="red" size="big" onClick={this.handleJoinRed} disabled={!this.state.name}>Join Red Team</Button>
			 			</div>
					</div>	
				);
			};
		return(
			<div>
				<TeamsList
					users = {this.props.users}
				>
				</TeamsList>
				{button}
			</div>
		);
	}
}