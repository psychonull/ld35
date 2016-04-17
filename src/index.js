
import paper from 'paper';
import Game from './Game';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GameState from './containers/GameState.js';
import React from 'react';
import configureStore from './store/configureStore';
import MainMenu from './components/MainMenu.js';
import Popup from './Popup.js';
import qs from 'qs';

window.React = React; //HACK: React is undefined error?

paper.install(window);
window.paper = paper;

window.onload = function() {
  paper.setup('game-viewport');

  const store = configureStore();
  let startingOptions = qs.parse(location.hash.substr(1));
  let game = new Game(store, startingOptions);

  if(startingOptions.level){
    document.getElementById('container').classList.remove('hidden');
    game.start(parseInt(startingOptions.level) - 1);
  }
  else {
    let p = new Popup('main-menu');
    p.show(<MainMenu game={game} onClose={() => p.hide()} />);
  }

  ReactDOM.render(
    <Provider store={store}>
      <GameState game={game}/>
    </Provider>,
    document.getElementById('game-hud'));
};
