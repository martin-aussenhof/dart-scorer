import React from 'react';

import {Players} from './../api/players';

export default class AddPlayer extends React.Component {

  handleSubmit(e) {
    let playerName = e.target.playerName.value;
    let playerNumber = e.target.playerNumber.value;

    e.preventDefault();

    if(playerName) {
      e.target.playerName.value = '';
      e.target.playerNumber.value = '';
      Players.insert({
        name: playerName,
        score: 1,
        isDead: false,
        number: playerNumber,
        
      });
    }
  }

  render() {
    return (
      <div className="item">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input className="form__input" type="text" name="playerName" placeholder="Player name"/>
            <input className="form__input" type="text" name="playerNumber" placeholder="Player number"/>
            <button className="button">Add Player</button>
        </form>
      </div>
   
    )
  }
}
