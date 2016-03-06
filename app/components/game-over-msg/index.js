import React, { Component } from 'react';
import { initialize } from '../../utils/';
import Button from '../button/';

export default class GameOverMsg extends Component {
  startNewGame () {
    this.props.initGame(initialize());
  }

  render () {
    return (
      <div className='modal'>
        <div className='gameOver'>
          <h3>Game Over :(</h3>
          <Button onClick={this.startNewGame.bind(this)} />
        </div>
      </div>
    );
  }
}
