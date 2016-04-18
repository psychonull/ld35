import { Howl } from 'howler';

// bgm
export const bgMusic = new Howl({
  urls: ['assets/sounds/bg.mp3'],
  loop: true,
  volume: .5
});

//sfx

export const hoverLink = new Howl({
  urls: ['assets/sounds/hoverLink.wav']
});

export const clickLink = new Howl({
  urls: ['assets/sounds/hoverLink.wav']
});

export const moving = new Howl({
  urls: ['assets/sounds/hoverLink.wav'],
  loop: true
});

export const hitTarget = new Howl({
  urls: ['assets/sounds/hoverLink.wav']
});
