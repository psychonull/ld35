import { Howler } from 'howler';
import * as Sounds from './index.js';
import $ from 'jquery';

export const register = (game) => {

  let bgPlaying = false;

  game.on('game:start', () => {
    Sounds.bgMusic.play();
    bgPlaying = true;
  });

  game.on('level:start', () => {
    if(!bgPlaying){
      Sounds.bgMusic.play();
      bgPlaying = true;
    }
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
    //Sounds.win1.play();
    //setTimeout(() => {
      Sounds.win2.play();
    //}, 300);
  });

  grid.on('game:lost', () => {
    Sounds.loose1.play();
    setTimeout(() => {
      Sounds.loose2.play();
    }, 1000);
  });

  grid.on('hover:cell', () => {
    Sounds.hoverCell.play();
  });

  grid.on('move:start', () => {
    Sounds.moving.play();
  });

  grid.on('move:end', () => {
    Sounds.arrived.play();
  });

  grid.on('move:shape', code => {
    Sounds['shape' + code].play();
  });
};
