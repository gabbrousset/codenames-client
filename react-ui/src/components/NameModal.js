import React, { Component } from "react";
import { Button, Header, Input, Modal } from 'semantic-ui-react'

export default class NameModal extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { mode: undefined } ;
	// }
	state={
		name: this.props.user.name,
		// openNameModal: true
	};
	handleChangeNameInput = (name) => {
		this.setState({name: name.target.value})
	};
	handleSubmit = (e) => {
		e.preventDefault();
		// this.setState({
		// 	openNameModal: false,
		// })
		this.props.changeNameInput(this.state.name);
	};
	checkName = (props) => {
		if (this.props.user.name) {
			return false
		} else {
			return true
		}
	}
	render(){
		console.log("state", this.state)
		return(
			<Modal open={this.checkName()} size="mini">
				<Modal.Header>Welcome!</Modal.Header>
				<Modal.Content image>
					<Modal.Description>
						<span>
							Please enter your username:
						</span>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions className="nameModalForm">
					<form className="message ui action input" onSubmit={this.handleSubmit}>
						<Input type="text" placeholder="Name" value={this.state.name} size="large" className="inputChat" onChange={this.handleChangeNameInput} />
						<Button  type="submit" size="large" className="ui button nameModalButton" disabled={!this.state.name}>Submit</Button>
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