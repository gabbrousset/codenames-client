import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

export default class TeamComponent extends Component {
	state ={
		name: this.props.user.name,
		changeName: false,
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

	addNameToItem = (user, buttons) => {
		return (
			<div className="userPanel item" key={user.userId}>
				{user.isSpymaster ? <i className="large eye icon" /> : <i className="large user outline icon" />}
				{(!this.state.changeName||this.props.gameActive) &&
					<div className="content">
						{user.name}
					</div>
				}
				{(!this.props.gameActive&&(this.props.user.userId===user.userId)) && buttons}
			</div>
		);
	};
	render(){
		let buttons = (
			<div className="userPanelButtons">
				{this.state.changeName ?
					<form className=" ui action input" id="nameLobby" onSubmit={this.handleSubmitNameInput}>
			 			<Input type="text" placeholder="Name" value={this.state.name} size="mini" onChange={this.handleChangeNameInput} />
			 			<Button  type="submit" size="mini" className="ui button" disabled={!this.state.name}>Submit</Button>
		 			</form>
					:
					<a><i className="pencil alternate icon" onClick={this.openChangeName}/></a>
				}
				{(!this.props.gameActive&&(!this.props.teamSpymaster||this.props.user.isSpymaster))&&
					<a className={this.props.user.team + "Count"} color={this.props.user.isSpymaster? 'grey' : this.props.user.team} onClick={this.toggleSpymaster}>
						{ this.props.user.isSpymaster ? 'Become a User' : 'Become Spymaster' }
					</a>
					// <Button color={this.props.user.isSpymaster? 'grey' : this.props.user.team} size="mini" onClick={this.toggleSpymaster} disabled={this.props[teamSpy] && !this.props.user.isSpymaster} >
					// </Button>
				}
			</div>
		)
		let teamList = [];
		this.props.teamUsers.map((user) => {
			if (user.isSpymaster === true) {
				teamList.unshift(this.addNameToItem(user, buttons));
			} else {
				teamList.push(this.addNameToItem(user, buttons));
			}
		})
		return(
			<div className="ui middle aligned divided list">
				{teamList}
			</div>
		);
	}
}