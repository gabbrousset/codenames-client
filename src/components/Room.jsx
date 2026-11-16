import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import Game from './Game';
import NameModal from './NameModal';
import socket from '../socket';

import { withRouter } from 'react-router-dom';

const noUser = { userId: '', name: '', team: '', isSpymaster: false };

// The secret that identifies this browser to the server across reloads. It is
// never shown to other players; the server gives everyone a separate public id.
const getToken = () => {
    let token = localStorage.getItem('codenamesToken');
    if (!token) {
        token = uuidv4();
        localStorage.setItem('codenamesToken', token);
    }
    return token;
};

// The server owns the room: every handler below sends an intent, and the
// server checks it, applies it and sends each player their view back.
class Room extends Component {
    state = {
        user: noUser,
        room: {
            id: this.props.match.params.id,
            users: [],
            info: {
                redWins: 0,
                blueWins: 0,
                blueSpymaster: '',
                redSpymaster: '',
            },
            messages: [],
            game: null,
        },
        joinError: '',
        spymasterView: false,
    };

    handleNewGame = () => {
        socket.emit('new game');
    };
    handleEndGame = () => {
        socket.emit('end game');
    };
    handleEndTurn = () => {
        socket.emit('end turn');
    };
    handleSelectClick = (clueId) => {
        socket.emit('guess', { index: clueId });
    };
    handleViewToggle = () => {
        this.setState((prevState) => ({
            spymasterView: !prevState.spymasterView,
        }));
    };
    handleToggleSpymaster = () => {
        socket.emit('set spymaster', { on: !this.state.user.isSpymaster });
    };
    handleShuffleTeams = () => {
        socket.emit('shuffle teams');
    };
    handleJoinTeam = (team) => {
        socket.emit('join team', { team });
    };
    handleSwitchTeam = () => {
        socket.emit('join team', {
            team: this.state.user.team === 'blue' ? 'red' : 'blue',
        });
    };
    handleSendClue = (clue, number) => {
        socket.emit('give clue', { clue, number: parseInt(number, 10) });
    };
    handleSendMessage = (message) => {
        socket.emit('chat', { text: message });
    };
    handleChangeNameInput = (name) => {
        socket.emit('rename', { name });
    };
    handleLeaveRoom = () => {
        this.props.history.push({
            pathname: '/',
        });
    };
    joinRoom = () => {
        socket.emit('join room', {
            roomId: this.props.match.params.id,
            token: getToken(),
        });
    };
    onRoom = (view) => {
        const { me, ...room } = view;
        this.setState((prevState) => ({
            room: { ...room, messages: prevState.room.messages },
            user: me || noUser,
            spymasterView:
                prevState.spymasterView &&
                Boolean(room.game && room.game.gameActive),
        }));
    };
    onMessages = (messages) => {
        this.setState((prevState) => ({
            room: { ...prevState.room, messages },
        }));
    };
    onMessage = (message) => {
        this.setState((prevState) => ({
            room: {
                ...prevState.room,
                messages: [...prevState.room.messages, message],
            },
        }));
    };
    onJoinFailed = (error) => {
        this.setState({
            joinError:
                error === 'room_full'
                    ? 'This room is full.'
                    : 'This room does not exist or has expired.',
        });
    };
    componentDidMount() {
        socket.on('room', this.onRoom);
        socket.on('messages', this.onMessages);
        socket.on('receive message', this.onMessage);
        socket.on('join failed', this.onJoinFailed);
        // Join now and again after every reconnect.
        socket.on('connect', this.joinRoom);
        if (socket.connected) this.joinRoom();
    }
    componentWillUnmount() {
        socket.off('room', this.onRoom);
        socket.off('messages', this.onMessages);
        socket.off('receive message', this.onMessage);
        socket.off('join failed', this.onJoinFailed);
        socket.off('connect', this.joinRoom);
        socket.emit('leave room');
    }
    render() {
        if (this.state.joinError) {
            return (
                <div className='columnButtons'>
                    <div className='joinGameError'>
                        <span>{this.state.joinError}</span>
                    </div>
                    <Button color='grey' size='massive' onClick={this.handleLeaveRoom}>
                        Back
                    </Button>
                </div>
            );
        }
        return (
            <div>
                <NameModal
                    user={this.state.user}
                    changeNameInput={this.handleChangeNameInput}
                />
                <div className='shareLink'>
                    <span>
                        Share this link to play with your friends:{' '}
                        <a href=''>
                            https://codenames.gabbrousset.dev
                            {this.props.history.location.pathname}
                        </a>
                    </span>
                </div>
                <Game
                    {...this.state.room.game}
                    user={this.state.user}
                    sendClue={this.handleSendClue}
                    // spymasterClue={this.state.room.game.spymasterClue}
                    messages={this.state.room.messages}
                    sendMessage={this.handleSendMessage}
                    handleNewGame={this.handleNewGame}
                    endTurn={this.handleEndTurn}
                    spymasterView={this.state.spymasterView}
                    onSelectClick={this.handleSelectClick}
                    handleViewToggle={this.handleViewToggle}
                    // handleBackLobby={this.handleBackLobby}
                    handleEndGame={this.handleEndGame}
                    // currentWinner={this.state.room.game.currentWinner}
                    // teamCount={this.state.room.game[teamCount]}

                    leaveRoom={this.handleLeaveRoom}
                    shuffleTeams={this.handleShuffleTeams}
                    toggleSpymaster={this.handleToggleSpymaster}
                    history={this.props.history}
                    room={this.state.room}
                    blueSpymaster={this.state.room.info.blueSpymaster}
                    redSpymaster={this.state.room.info.redSpymaster}
                    // game={this.state.room.game}
                    users={this.state.room.users}
                    showGame={this.handleShowGame}
                    roomId={this.props.match.params.id}
                    joinTeam={this.handleJoinTeam}
                    switchTeam={this.handleSwitchTeam}
                    changeNameInput={this.handleChangeNameInput}
                    blueWins={this.state.room.info.blueWins}
                    redWins={this.state.room.info.redWins}
                ></Game>
            </div>
        );
        // 	else {
        // 		return(
        // 			<div>
        // 				<div className="shareLink">
        // 					<span>Share this link to play with your friends: <a href={"https://codenames.gabbrousset.dev"+this.props.history.location.pathname}>codenames.gabbrousset.dev{this.props.history.location.pathname}</a></span>
        // 				</div>
        // 				<Lobby
        // 					shuffleTeams={this.handleShuffleTeams}
        // 					toggleSpymaster={this.handleToggleSpymaster}
        // 					history={this.props.history}
        // 					room={this.state.room}
        // 					blueSpymaster={this.state.room.info.blueSpymaster}
        // 					redSpymaster={this.state.room.info.redSpymaster}
        // 					game={this.state.room.game}
        // 					users={this.state.room.users}
        // 					user={this.state.user}
        // 					showGame={this.handleShowGame}
        // 					openNewGame={this.handleOpenNewGame}
        // 					roomId={this.props.match.params.id}
        // 					joinTeam={this.handleJoinTeam}
        // 					switchTeam={this.handleSwitchTeam}
        // 					changeNameInput = {this.handleChangeNameInput}
        // 					blueWins = {this.state.room.info.blueWins}
        // 					redWins = {this.state.room.info.redWins}
        // 				>
        // 				</Lobby>
        // 			</div>
        // 		);
        // 	}
    }
}

export default withRouter(Room);
