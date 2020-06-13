import React, { Component } from "react";

export default class Footer extends Component {
	render(){
		return(
			<a target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/coolcoolcool">
				<div className="buyCoffeeHolder">
					<img className="buyCoffeeImage" src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy us a Coffee" />
					<span className="buyCoffeeText">
						Buy me a Coffee
					</span>
				</div>
			</a>
		);
	};
};

