import React from 'react';
import PropTypes from 'prop-types';
import {Players} from './../../imports/api/players';
import FaStarO from 'react-icons/lib/fa/star-o';
import FaStar from 'react-icons/lib/fa/star';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaHeart from 'react-icons/lib/fa/heart';
import FaBan from 'react-icons/lib/fa/ban';



export default class Player extends React.Component {
  // 
  incrementScore(changeType) {

    console.log("before: " + this.props.player.isDead + this.props.player.score)


    if (this.props.player.score === 1 && changeType === -1) {
      Players.update(this.props.player._id,{$set:{isDead: true}, $inc: {score: changeType}});
    }
    else if (this.props.player.isDead === false && this.props.player.score < 7 && changeType === 1) {
      console.log(FaBan)
      Players.update(this.props.player._id,{$inc: {score: changeType}});
      console.log("after: " + this.props.player.score)
    } 
    else if (this.props.player.isDead === false && this.props.player.score > 1 && changeType === -1) {
      Players.update(this.props.player._id,{$inc: {score: changeType}});
    }
    else {
      console.log("Player is dead");
    }
    
  }

  render() {


    function renderHearts(score, status, name){
      if(!status){
        return 'X' + Array(score).join('\u2764')
      }
      else {
        return name + ' is dead.'
      }
      

    }
    return (

      <div key={this.props.player._id} className={"item " + (this.props.player.score >= 4 ? 'item--killerMode' : (this.props.player.score === 1) ? 'item--lastLife' : (this.props.player.isDead === true) ? 'status--dead' : '')}>
        <p className="item--hearts" id="hearts">
          {console.log(this.props.player.score)}
          {renderHearts(this.props.player.score, this.props.player.isDead, this.props.player.name)}        
        
        </p>
        <p className="item--player">
          {this.props.player.number} - {this.props.player.name}
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