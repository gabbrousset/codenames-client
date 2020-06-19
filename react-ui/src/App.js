import React, { Component } from "react";
// import ReactGA from 'react-ga';
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route } from "react-router-dom";
// import { createBrowserHistory } from 'history';
import LandingPage from "./components/LandingPage";
import Room from "./components/Room";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import { createRoom } from './client';

// ReactGA.initialize('UA-169288507-2');
// ReactGA.pageview(window.location.pathname + window.location.search);

export default class App extends Component {
	// state={
	// };
	// //clicked landing new game
	// handleClickCreateGameSession = (game) => {
		// this.setState({
		// 	game: game,
		// });	
	// };
	render(){
		return (
				<BrowserRouter>
					<div>
						<Header />
						<Route
							exact path="/"
							render={(props) => <LandingPage {...props} />}
							// render={(props) => <LandingPage {...props} clickCreateGameSession={this.handleClickCreateGameSession} rooms={this.state.rooms} />}
						/>
						<Route
							exact path="/:id"
							render={(props)=> <Room {...props} />}
							// render={(props)=> <Room {...props} game={this.state.game} />}
						/>
						<Footer />					
					</div>
				</BrowserRouter>
		)
	}
}