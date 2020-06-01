import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

export default class JoinGame extends Component {
	state={
	};
	render(){
		return(
			<div>
				<div className="input-top">
					<Input
						placeholder="Name"
						size="massive"
					/>
				</div>
				<div className="input-bottom">
					<Input
						placeholder="Room ID"
						size="massive"
					/>
				</div>
				<div className="rowButtons">
					<Button
						color="blue"
						size="massive"
						onClick={this.props.clickCreateGameSession}
					>
						Join
					</Button>
					<Button
						color="grey"
						size="massive"
						onClick={this.props.clickLandingButtons}
					>
						Back
					</Button>
				</div>
			</div>
		);
	}
}