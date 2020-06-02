import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Room from "./components/Room";
import Footer from "./components/Footer";
import {newRoom} from "./helpers"

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";

export default class App extends Component {
	state={
		rooms: [],
	};

	//clicked landing new game
	handleClickCreateGameSession = () => {
		this.createNewRoom();
	};
	createNewRoom = () => {
		const room = newRoom();
		this.setState({
			rooms: this.state.rooms.concat(room),
		});
		console.log(room.id);
	};
	render(){
		console.log(this.state.rooms);
		return (
				<BrowserRouter>
					<div>
						<Route
							exact path="/"
							render={(props) => <LandingPage {...props} clickCreateGameSession={this.handleClickCreateGameSession} />}
						/>
						<Route
							exact path="/:id"
							component={Room}
						/>
					</div>
					<Footer />					
				</BrowserRouter>
		)
	}
}