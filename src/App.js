import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Room from "./components/Room";
import Footer from "./components/Footer";
import Header from "./components/Header";
import data from './data';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketIOClient(ENDPOINT);

export default class App extends Component {
	state={
		rooms: [],
	};
	//clicked landing new game
	// cambiar a http
	handleClickCreateGameSession = (room) => {
		this.setState({
			rooms: this.state.rooms.concat(room),
		// }, () => socket.emit("created room", room));
			}, () => socket.emit("created room", room));		
	};
	// createNewRoom = () => {
	// 	const room = newRoom();
	// 	this.setState({
	// 		rooms: this.state.rooms.concat(room),
	// 	});
	// };
	render(){
		// console.log(this.state.rooms);
		return (
				<BrowserRouter>
					<Header />
					<div>
						<Route
							exact path="/"
							render={(props) => <LandingPage {...props} clickCreateGameSession={this.handleClickCreateGameSession} rooms={this.state.rooms}/>}
						/>
						<Route
							exact path="/:ids"
							render={(props)=> <Room {...props} room={this.state.room}  />}
							// component={Room}
						/>
					</div>
					<Footer />					
				</BrowserRouter>
		)
	}
}