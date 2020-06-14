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
				<div className={"messageClue-" + message.color} key={uuid.v4()}>
					<span>{message.message} {message.number}</span>
				</div>
			);
		} else if (message.type==="select clue") {
			return(
				<div className="messageText" key={uuid.v4()}>
					<span className={message.color+"Count"}>{message.name}</span> <em>clicked</em> <span className={message.clueColor+"Count"}>{message.message}</span>
				</div>
			);
		} else if (message.type==="end game") {
			return(
				<div className="messageText" key={uuid.v4()}>
					<b><span className={message.color+"Count"}>{message.name}</span> ended the Game</b>
				</div>
			)
		} else if (message.type==="end turn") {
			return(
				<div className="messageText" key={uuid.v4()}>
					<span className={message.color+"Count"}>{message.name}</span><span> ended his team's turn</span>
				</div>
			)
		}
	}
	scrollToBottom = () => {
		// this.messagesEnd.scrollIntoView({ behavior: "smooth" });
		// this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight;
	}
	componentDidMount() {
		this.scrollToBottom();
	}
	render(){
		let messages = [];
		if (this.props.messages){
			this.props.messages.map((message)=> {
				messages.unshift(this.formatMessage(message))
				// messages.push(this.formatMessage(message))
			})
		}
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