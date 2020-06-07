import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Room from "./components/Room";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { createRoom } from './client';


export default class App extends Component {
	state={
		rooms: [],
	};
	//clicked landing new game
	handleClickCreateGameSession = (room) => {
		this.setState({
			rooms: this.state.rooms.concat(room),
			}, () => createRoom(room));		
	};
	render(){
		// console.log(this.state.rooms);
		return (
				<BrowserRouter>
					<div>
						<Header />
						<Route
							exact path="/"
							render={(props) => <LandingPage {...props} clickCreateGameSession={this.handleClickCreateGameSession} rooms={this.state.rooms}/>}
						/>
						<Route
							exact path="/:id"
							render={(props)=> <Room {...props} room={this.state.room}  />}
						/>
						<Footer />					
					</div>
				</BrowserRouter>
		)
	}
}