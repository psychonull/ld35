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
  urls: ['assets/sounds/onmove.wav']
});

export const hoverCell = new Howl({
  urls: ['assets/sounds/hover.wav']
});

export const arrived = new Howl({
  urls: ['assets/sounds/arrived.wav']
});

export const loose1 = new Howl({
  urls: ['assets/sounds/loose1.wav']
});

export const loose2 = new Howl({
  urls: ['assets/sounds/loose2.wav']
});

//export const win1 = new Howl({
//  urls: ['assets/sounds/win1.wav']
//});

export const win2 = new Howl({
  urls: ['assets/sounds/win2.wav']
});

export const shape1 = new Howl({
  urls: ['assets/sounds/shape1.wav']
});

export const shape2 = new Howl({
  urls: ['assets/sounds/shape2.wav']
});

export const shape3 = new Howl({
  urls: ['assets/sounds/shape3.wav']
});
/*
export const shape4 = new Howl({
  urls: ['assets/sounds/shape4.wav']
});

export const shape5 = new Howl({
  urls: ['assets/sounds/shape5.wav']
});
*/
