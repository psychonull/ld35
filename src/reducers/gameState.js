import {
  TOGGLE_SOUND,
  ADD_MOVE,
  RESET_MOVES,
  LOAD_LEVEL,
  RESTART_LEVEL,
  CHANGE_MOVE,
  CHANGE_NEXT
} from '../constants/ActionTypes';

let ls = window.localStorage.getItem('ld35');
if(ls){
  ls = JSON.parse(ls);
}
else {
  ls = {
    sound: true,
    maxLevel: 1
  };
}

const initialState = {
  levelNumber: 1,
  moves: -1, //HACK: start with -1 since the initial placement counts
  maxMoves: false,
  sound: ls.sound,
  maxLevel: ls.maxLevel,
  currentMove: {},
  nextMove: {},
  author: null
};

export default function gameState(state = initialState, action) {
	switch (action.type) {
    case CHANGE_MOVE:
      return Object.assign({}, state, {currentMove: action.moveGrid});
    case CHANGE_NEXT:
      return Object.assign({}, state, {nextMove: action.moveGrid});
    case ADD_MOVE:
      return Object.assign({}, state, {moves: state.moves + 1});
    case RESTART_LEVEL:
    case RESET_MOVES:
      return Object.assign({}, state, {moves: -1});
    case TOGGLE_SOUND:
      return Object.assign({}, state, {sound: !state.sound});
    case LOAD_LEVEL:
      return Object.assign({}, state, {
        moves: -1, maxMoves: action.levelData.maxMoves, author: action.levelData.author,
        levelNumber: action.levelNumber, maxLevel: Math.max(action.levelNumber, state.maxLevel)});
		default:
			return state;
	}
}
