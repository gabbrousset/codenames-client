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
				<div>
					<DisplayChat
						messages={this.props.messages}
					/>
				</div>
				<div>
					<form  onSubmit={this.handleSendMessage}  className="message ui action input">
						<Input type="text" placeholder="Message" className="inputChat" onChange={this.handleChangeMessage} value={this.state.message}></Input>
						<Button type="submit" className="ui button">Send</Button>
					</form>
				</div>
			</div>
		);
	};
}