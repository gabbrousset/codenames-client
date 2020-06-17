import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import DisplayChat from "./DisplayChat";

export default class Chat extends Component {
	state={
		message: "",
	};
	handleChangeMessage = (message) => {
		this.setState({message: message.target.value})
	};
	handleSendMessage = (e) => {
		e.preventDefault();
		const message = this.state.message;
		this.setState({
			message: "",
		})
		this.props.sendMessage(message);
	};
	render(){
		return(
			<div className="chat four wide column">
				<DisplayChat
					messages={this.props.messages}
				/>
				<div>
					<form  onSubmit={this.handleSendMessage}  className="message ui action input">
						<Input type="text" placeholder="Message" className="inputChat" onChange={this.handleChangeMessage} value={this.state.message} disabled={!this.props.user.name}></Input>
						<Button type="submit" className="ui button messageButton" disabled={!this.props.user.name || !this.state.message} >Send</Button>
					</form>
				</div>
			</div>
		);
	};
}