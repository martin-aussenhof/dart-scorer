import React from 'react';
import PropTypes from 'prop-types';
import {Players} from './../../imports/api/players';
// import FaBeer from 'react-icons/fa/beer';

export default class Player extends React.Component {
  incrementScore(changeType) {
    console.log(this.props.player.isDead + this.props.player.score)
    if (this.props.player.isDead === false && this.props.player.score === 0 && changeType === -1) {
      Players.update(this.props.player._id,{$set:{isDead: true}});
    }
    else if (this.props.player.isDead === false && this.props.player.score < 6 && changeType === 1) {
      Players.update(this.props.player._id,{$inc: {score: changeType}});
    } 
    else if (this.props.player.isDead === false && this.props.player.score > 0 && changeType === -1) {
      Players.update(this.props.player._id,{$inc: {score: changeType}});
      if (this.props.player.score) {console.log("Final Life " + this.props.player.score)}
    }
    else {
      console.log("Player is dead");
    }
  }
  render() {
    return (
      <div key={this.props.player._id} className={"item " + (this.props.player.score >= 3 ? 'item--killerMode' : (this.props.player.score === 0) ? 'item--lastLife' : '')}>
        <p className="item--hearts">
         {'\u2618 ' + Array(this.props.player.score+1).join('\u2764 ') }
        </p>
        <p className="item--player">
          {this.props.player.name}
        </p>
        <div className="item--buttons">
          <button className="button button--round" onClick={() => this.incrementScore(-1)}>-</button>
          <button className="button button--round" onClick={() => this.incrementScore(1)}>+</button>
          <button className="button button--round" onClick={() => Players.remove(this.props.player._id)}>X</button>
        </div>
      </div>
    )
  }
}

Player.PropTypes = {
  player: PropTypes.object.isRequired
}

// abc = (a !== -1 && b!== -1) ? "hai" : (c !== -1 && d!== -1) ? "hello" : "hurray";

// &#10084; - \u2764
// &#9829; - \u2665
// \u2620

//   <span className={"status status" + (this.props.player.isDead ? '--isDead' : (this.props.player.score === -1) ? '--lastLife' : (this.props.player.score >= 3) ? '--killerMode' : '')}></span>