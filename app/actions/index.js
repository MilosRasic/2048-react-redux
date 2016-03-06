import * as api from '../api/';

function init (gameField) {
  return {
    type: 'INITIALIZE',
    gameField
  }
}

function _move (gameField, score) {
  return {
    type: 'MOVE',
    gameField,
    score
  }
}

function _addRandom (gameField) {
  return {
    type: 'ADD_RANDOM',
    gameField
  }
}

export function gameOver () {
  return {
    type: 'GAME_OVER'
  }
}

export function initGame (gameField) {
  return (dispatch, state) => {
    dispatch(init(gameField));
    api.setItem(getGameState(state));
  }
}

export function setGame (data) {
  const { gameField, score, bestScore } = data;
  return {
    type: 'SET_GAME',
    gameField,
    score,
    bestScore
  }
}

export function move (gameField, score) {
  return (dispatch, state) => {
    dispatch(_move(gameField, score));
    api.setItem(getGameState(state));
    return;
  }
}

export function addRandom (gameField) {
  return (dispatch, state) => {
    dispatch(_addRandom(gameField));
    api.setItem(getGameState(state));
    return;
  }
}

function getGameState (state) {
  return {
    gameField: state().game.gameField,
    score: state().game.score,
    bestScore: state().game.bestScore
  }
}
