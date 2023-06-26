import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import TeamsList from "./TeamsList"

export default class Teams extends Component {
	state ={
		name: this.props.user.name,
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
	handleSubmitNameInput = (e) => {
		e.preventDefault();
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
	toggleSpymaster = () => {
		this.props.toggleSpymaster();
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
		let button;
			if(this.props.user.team) {
				if (this.state.changeName){
				// change name (cuando ya tienes equipo)
					button = (
						<div>
							<form className=" ui action input" id="nameLobby" onSubmit={this.handleSubmitNameInput}>
					 			<Input type="text" placeholder="Name" value={this.state.name} size="big" onChange={this.handleChangeNameInput} />
					 			<Button  type="submit" className="ui button" disabled={!this.state.name}>Submit</Button>
				 			</form>
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
								<Button color={this.props.user.isSpymaster? 'grey' : this.props.user.team} size="large" onClick={this.toggleSpymaster} disabled={this.props[teamSpy] && !this.props.user.isSpymaster} >
									{ this.props.user.isSpymaster ? 'User Role' : 'Spymaster Role' }
								</Button>
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
			<div style={{margin: '30px'}}>
				<TeamsList
					users = {this.props.users}
					blueWins={this.props.blueWins}
					redWins={this.props.redWins}
				>
				</TeamsList>
				{button}
			</div>
		);
	}
}