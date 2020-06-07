import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Clue from "./Clue";

export default class ClueBoard extends Component {
	render(){
		return(
		<div  className="boardGame">
			  <Grid colums={5} className="centered">
			    {this.props.clues.map((clue) => (
					<Grid.Column width={3} key={clue.id}>
			     		<Clue
			     			{...clue}
			     			onSelectClick={this.props.onSelectClick}
			     			spymasterView={this.props.spymasterView}
			     		/>
			     	</Grid.Column>
			    ))}
			  </Grid>
		 </div>
		);
	}
}