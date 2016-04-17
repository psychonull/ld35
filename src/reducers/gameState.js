import {
  TOGGLE_SOUND,
  ADD_MOVE,
  RESET_MOVES
} from '../constants/ActionTypes';

const initialState = {
  levelNumber: 1,
  moves: 0,
  maxMoves: false,
  sound: true
};

export default function gameState(state = initialState, action) {
	switch (action.type) {
    case ADD_MOVE:
      return Object.assign({}, state, {moves: state.moves + 1});
    case RESET_MOVES:
      return Object.assign({}, state, {moves: 0});
    case TOGGLE_SOUND:
      return Object.assign({}, state, {sound: !state.sound});
		default:
			return state;
	}
}
