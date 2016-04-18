import { Howler } from 'howler';
import * as Sounds from './index.js';
import $ from 'jquery';

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

  $(document).on('mouseenter', 'a', () => Sounds.hoverLink.play());

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
