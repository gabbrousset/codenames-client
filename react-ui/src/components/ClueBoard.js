import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Clue from "./Clue";

export default class ClueBoard extends Component {

		// <div  className="boardGame">
		// 	  <Grid colums={5} className="centered">
		// 	    {this.props.clues.map((clue) => (
		// 			<Grid.Column width={3} key={clue.id}>
		// 	     		<Clue
		// 	     			{...clue}
		// 	     			onSelectClick={this.props.onSelectClick}
		// 	     			spymasterView={this.props.spymasterView}
		// 	     		/>
		// 	     	</Grid.Column>
		// 	    ))}
		// 	  </Grid>



	render(){
		return(
		<div  className="boardGame">
			  <div className="ui centered grid">
			    {this.props.clues.map((clue) => (
					<div className="eight wide mobile three wide tablet three wide computer column" key={clue.id}>
			     		<Clue
			     			{...clue}
			     			onSelectClick={this.props.onSelectClick}
			     			spymasterView={this.props.spymasterView}
			     		/>
			     	</div>
			    ))}
			  </div>
		 </div>
		);
	}
}