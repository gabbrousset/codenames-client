import React, { Component, useEffect } from "react";

const buyUsACoffee = '<style>.bmc-button img{height: 34px !important;width: 35px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{padding: 7px 15px 7px 10px !important;line-height: 35px !important;height:51px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#FF813F !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 15px 7px 10px !important;font-size: 20px !important;letter-spacing:-0.08px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:"Lato", sans-serif !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/gabrieletdiego"><img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy us a Coffee"><span style="margin-left:5px;font-size:19px !important;">Buy us a Coffee</span></a>';
export default class Footer extends Component {
	render(){
		return(
			<div className="buyCoffeeHolder">
				<a target="_blank" href="https://www.buymeacoffee.com/gabrieletdiego">
					<img className="buyCoffeeImage" src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy us a Coffee" />
					<span className="buyCoffeeText">
						Buy us a Coffee
					</span>
				</a>
			</div>
		);
	};
};

