import React, { Component } from "react";
import uuid from "uuid";
import { Button, Input } from "semantic-ui-react";

export default class DisplayChat extends Component {
	formatMessage = (message) => {
		return (
			<div className={"messageText " + message.color} key={uuid.v4()}>
				{message.name}: {message.message}
			</div>
		);
	}
	render(){
		let messages = [];
		this.props.messages.map((message)=> {
			messages.push(this.formatMessage(message))
		})
		return(
			<div className="chatWindow">
				{messages}
			</div>
		);
	};
}