import {
  TOGGLE_SOUND
} from '../constants/ActionTypes';

const initialState = {
  levelNumber: 1,
  moves: 0,
  maxMoves: false,
  sound: true
};

export default function gameState(state = initialState, action) {
	switch (action.type) {
    case TOGGLE_SOUND:
      return Object.assign({}, state, {sound: !state.sound});
		default:
			return state;
	}
}
