import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

export default class NewGame extends Component {
	
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
				<div className="rowButtons">
					<Button
						color="blue"
						size="massive"
						onClick={this.props.clickCreateGameSession}
					>
						Create
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