import * as types from '../constants/ActionTypes';

export function toggleSound(){
	return { type: types.TOGGLE_SOUND };
}

export function addMove(){
  return { type: types.ADD_MOVE };
}

export function resetMoves(){
  return { type: types.RESET_MOVES };
}
