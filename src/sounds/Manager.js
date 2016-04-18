import { Howler } from 'howler';
import * as Sounds from './index.js';
import $ from 'jquery';

export const register = (game) => {

  game.on('game:start', () => {
    Sounds.bgMusic.play();
  });

  game.on('story:in', () => {
    console.log('storyin');
  });

  game.on('story:out', () => {
    console.log('storyout');
  });

  game.on('sound:mute', () => {
    Howler.mute();
  });

  game.on('sound:unmute', () => {
    Howler.unmute();
  });

  $(document).on('mouseenter', 'a', () => Sounds.hoverLink.play());
  $(document).on('click', 'a', () => Sounds.clickLink.play());

};

export const registerGrid = (grid) => {
  grid.on('game:goal', () => {
    console.log('gamegoal');
  });

  grid.on('game:lost', () => {
    console.log('gamelost');
  });

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
