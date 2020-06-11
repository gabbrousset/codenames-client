import React, { Component } from "react";
import uuid from "uuid";

export default class DisplayChat extends Component {
	formatMessage = (message) => {
		if (message.type==="message") {
			return(
				<div className="messageText" key={uuid.v4()}>
					<span className={message.color+"Count"}>{message.name}:</span> {message.message}
				</div>
			);
		} else if (message.type==="spymasterClue") {
			return(
				<div className="messageText" key={uuid.v4()}>
					<span className={message.color+"Count"}>Clue:</span> {message.message}
				</div>
			);
		} else if (message.type==="select clue") {
			return(
				<div className="messageText" key={uuid.v4()}>
					<span className={message.color+"Count"}>{message.name}</span> clicked <span className={message.clueColor+"Count"}>{message.message}</span>
				</div>
			);
		}
	}
	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}
	componentDidMount() {
		this.scrollToBottom();
	}
	componentDidUpdate() {
		this.scrollToBottom();
	}
	render(){
		let messages = [];
		this.props.messages.map((message)=> {
			messages.push(this.formatMessage(message))
		})
		return(
			<div className="chatWindow">
				{messages}
				<div style={{ float:"left", clear: "both" }}
					ref={(el) => { this.messagesEnd = el; }}>
				</div>
			</div>
		);
	};
}