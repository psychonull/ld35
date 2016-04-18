import { Howler } from 'howler';
import * as Sounds from './index.js';

export const register = (game) => {

  game.on('game:start', () => {
    Sounds.bgMusic.play();
  });

  game.on('sound:mute', () => {
    Howler.mute();
  });

  game.on('sound:unmute', () => {
    Howler.unmute();
  });

  // inneficient!
  document.addEventListener('mousemove', function(){
    if(document.querySelector('a:hover')){
      Sounds.hoverLink.play();
    }
  });

};

export const registerGrid = (grid) => {
  grid.on('move:start', () => {
    Sounds.moving.play();
  });

  grid.on('move:end', () => {
    Sounds.moving.stop();
  });

  grid.on('move:target', () => {
    Sounds.hitTarget.play();
  });
};
