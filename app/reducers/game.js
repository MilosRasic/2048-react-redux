
export default function game (state = {
  gameField: [],
  score: 0,
  bestScore: 0
}, action) {

  switch (action.type) {
    case 'INITIALIZE':
      return {...state, gameField: action.gameField, score: 0, gameOver: false};

    case 'SET_GAME':
      return {...state, gameField: action.gameField, score: action.score, bestScore: action.bestScore};

    case 'MOVE':
      let score = state.score;
      let bestScore = state.bestScore;
      score += action.score;
      if (score >= bestScore) bestScore = score;
      return {...state, gameField: action.gameField, score: score, bestScore: bestScore};

    case 'ADD_RANDOM':
      return {...state, gameField: action.gameField};

    case 'GAME_OVER':
      return {...state, gameOver: true};
  }

  return state;
}
