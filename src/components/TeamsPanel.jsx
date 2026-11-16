import React, { Component } from 'react';
import TeamToggleComponent from './TeamToggleComponent';

export default class TeamsPanel extends Component {
    handleJoinBlue = () => {
        this.joinTeam('blue');
    };
    handleJoinRed = () => {
        this.joinTeam('red');
    };
    joinTeam = (team) => {
        this.props.joinTeam(team, this.props.user.name);
    };
    render() {
        let blueUsers = [];
        let redUsers = [];
        this.props.users.forEach((user) => {
            if (user.team === 'blue') {
                blueUsers.push(user);
            } else if (user.team === 'red') {
                redUsers.push(user);
            }
        });
        return (
            <div className='teamsPanel'>
                <div className='blueTeam'>
                    <span className='blueTitle'>
                        Blue Team
                        <span className='teamWins'>{this.props.blueWins}</span>
                    </span>
                    <TeamToggleComponent
                        user={this.props.user}
                        users={this.props.users}
                        teamWins={this.props.blueWins}
                        teamUsers={blueUsers}
                        gameActive={this.props.gameActive}
                        changeNameInput={this.props.changeNameInput}
                        toggleSpymaster={this.props.toggleSpymaster}
                        joinTeam={this.handleJoinBlue}
                        switchTeam={this.props.switchTeam}
                        teamCount={this.props.blueCount}
                        teamSpymaster={this.props.blueSpymaster}
                        team='blue'
                    ></TeamToggleComponent>
                </div>
                <div className='redTeam'>
                    <span className='redTitle'>
                        Red Team
                        <span className='teamWins'>{this.props.redWins}</span>
                    </span>
                    <TeamToggleComponent
                        user={this.props.user}
                        users={this.props.users}
                        teamWins={this.props.redWins}
                        teamUsers={redUsers}
                        gameActive={this.props.gameActive}
                        changeNameInput={this.props.changeNameInput}
                        toggleSpymaster={this.props.toggleSpymaster}
                        joinTeam={this.handleJoinRed}
                        switchTeam={this.props.switchTeam}
                        teamCount={this.props.redCount}
                        teamSpymaster={this.props.redSpymaster}
                        team='red'
                    ></TeamToggleComponent>
                </div>
            </div>
        );
    }
}
