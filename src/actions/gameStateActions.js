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

export function loadLevel(levelData, levelNumber){
  return { type: types.LOAD_LEVEL, levelData, levelNumber };
}

export function restartLevel(){
	return { type: types.RESTART_LEVEL };
}

export function changeMove(moveGrid){
  return { type: types.CHANGE_MOVE, moveGrid };
}

export function nextMove(moveGrid){
  return { type: types.CHANGE_NEXT, moveGrid };
}
