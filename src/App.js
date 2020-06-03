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

export default class App extends Component {
	state={
		rooms: [
			{
				id: "123-456",
				gameCount:0,
				redWinCount:0,
				blueWinCount:0,
				game: {
					clues: data,
					turn: 'red',
					blueCount: 8,
					redCount: 9,
					gameActive : true,
					}
			},
			{
				id: "271-828",
				gameCount:0,
				redWinCount:0,
				blueWinCount:0,
				game: {
					clues: data,
					turn: 'red',
					blueCount: 8,
					redCount: 9,
					gameActive : true,
					}
			}	
		],
	};

	//clicked landing new game
	handleClickCreateGameSession = (room) => {
		this.setState({
			rooms: this.state.rooms.concat(room),
		});	
	};
	// createNewRoom = () => {
	// 	const room = newRoom();
	// 	this.setState({
	// 		rooms: this.state.rooms.concat(room),
	// 	});
	// };
	render(){
		console.log(this.state.rooms);
		return (
				<BrowserRouter>
					<Header />
					<div>
						<Route
							exact path="/"
							render={(props) => <LandingPage {...props} clickCreateGameSession={this.handleClickCreateGameSession} rooms={this.state.rooms}/>}
						/>
						<Route
							exact path="/:id"
							render={(props)=> <Room {...props} room={this.state.rooms[0]}  />}
							// component={Room}
						/>
					</div>
					<Footer />					
				</BrowserRouter>
		)
	}
}