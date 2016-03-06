import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash.isequal';
import * as Actions from '../actions/';

import Tile from './tile';
import Score from './score';
import GameOverMsg from './game-over-msg';
import Button from './button';

import { verticalShift, horizontalShift, setRandom, initialize, isGameOver } from '../utils/';
import { getItem } from '../api/';

class App extends Component {

  componentDidMount() {
    const data = getItem();

    if (!data) {
      this.props.initGame(initialize());
    } else {
      this.props.setGame(data);
    }
  }

  componentWillMount() {
    document.addEventListener('keyup', this.keyupHandler.bind(this));
  }

  componentWillUnMount() {
    document.removeEventListener('keyup', this.keyupHandler.bind(this));
  }

  keyupHandler(e) {
    const { gameField } = this.props.game;

    // Left move
    if (e.keyCode === 37) {
      let result = horizontalShift(gameField, 'left');
      this.moveTile(gameField, result);
    }

    // Right move
    if (e.keyCode === 39) {
      let result = horizontalShift(gameField, 'right');
      this.moveTile(gameField, result);
    }

    // Bottom move
    if (e.keyCode === 40) {
      let result = verticalShift(gameField, 'bottom');
      this.moveTile(gameField, result);
    }

    // Top move
    if (e.keyCode === 38) {
      let result = verticalShift(gameField, 'top');
      this.moveTile(gameField, result);
    }
  }

  moveTile (gameField, result) {
    if (!isEqual(gameField, result.result)) {
      this.props.move(result.result, result.sum);
      let addRandom = setRandom(result.result);
      setTimeout(() => this.props.addRandom(addRandom), 250);
    } else {
      if (isGameOver(gameField)) this.props.gameOver();
    }
  }

  startNewGame () {
    this.props.initGame(initialize());
  }

  renderTile(key) {
    return this.props.game.gameField[key].map((item, key) => <Tile key={key} item={item} />);
  }

  renderRaw() {
    return this.props.game.gameField.map((item, key) => <tr key={key}>{this.renderTile(key)}</tr>);
  }

  render() {
    const { score, bestScore, gameOver } = this.props.game;
    return (
      <div className='base'>
        <div>
          <Score score={score} bestScore={bestScore} />
          <Button onClick={this.startNewGame.bind(this)} />
        </div>
        {gameOver &&
          <GameOverMsg initGame={this.props.initGame} />
        }
        <table className='game'>
          <tbody>
            {this.renderRaw()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.game
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
