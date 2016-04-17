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

};
