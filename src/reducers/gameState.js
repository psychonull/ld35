import {
  TOGGLE_SOUND,
  ADD_MOVE,
  RESET_MOVES,
  LOAD_LEVEL,
  RESTART_LEVEL
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
  maxLevel: ls.maxLevel
};

export default function gameState(state = initialState, action) {
	switch (action.type) {
    case ADD_MOVE:
      return Object.assign({}, state, {moves: state.moves + 1});
    case RESTART_LEVEL:
    case RESET_MOVES:
      return Object.assign({}, state, {moves: -1});
    case TOGGLE_SOUND:
      return Object.assign({}, state, {sound: !state.sound});
    case LOAD_LEVEL:
      return Object.assign({}, state, {
        moves: -1, maxMoves: action.levelData.maxMoves,
        levelNumber: action.levelNumber, maxLevel: Math.max(action.levelNumber, state.maxLevel)});
		default:
			return state;
	}
}
