
import paper from 'paper';
import Game from './Game';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GameState from './containers/GameState.js';
import React from 'react';
import configureStore from './store/configureStore';

paper.install(window);
window.paper = paper;

window.onload = function() {
  paper.setup('game-viewport');

  const store = configureStore();
  let game = new Game(store);

  // move this into a menu (param is level index)
  game.start(0);
  window.React = React; //HACK: React is undefined error?
  ReactDOM.render(
    <Provider store={store}>
      <GameState/>
    </Provider>,
    document.getElementById('game-hud'));
};
