import React, { Component } from "react";
import { Button, Header, Input, Modal } from 'semantic-ui-react'

export default class NameModal extends Component {
	state={
		name: this.props.user.name,
		openNameModal: true,
	};
	handleChangeNameInput = (name) => {
		this.setState({name: name.target.value})
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			openNameModal: false,
		})
		this.props.changeNameInput(this.state.name);
	};
	render(){
		return(
			<Modal open={this.state.openNameModal} size="mini">
				<Modal.Header>Welcome!</Modal.Header>
				<Modal.Content image>
					<Modal.Description>
						<span>
							Please enter your username:
						</span>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions className="nameModalForm">
					<form className=" ui action input" onSubmit={this.handleSubmit}>
						<Input type="text" placeholder="Name" value={this.state.name} size="large" onChange={this.handleChangeNameInput} />
						<Button  type="submit" size="large" className="ui button" disabled={!this.state.name}>Submit</Button>
					</form>
{/*
						<div className="noNameError">
							{this.state.errorMsg ? <span>{this.state.errorMsg}</span> : '' }
						</div>
*/}
				</Modal.Actions>
			</Modal>
		)
	}
}