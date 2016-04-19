import { Howl } from 'howler';

let path = 'assets/sounds/';

// bgm
export const bgMusic = new Howl({
  urls: [path + 'Ludum35A.mp3'],
  loop: true,
  volume: .5
});

//sfx

export const hoverLink = new Howl({
  urls: [path + 'hoverLink.ogg', path + 'hoverLink.wav', path + 'hoverLink.mp3']
});

export const clickLink = new Howl({
  urls: [path + 'hoverLink.ogg', path + 'hoverLink.wav', path + 'hoverLink.mp3']
});

export const moving = new Howl({
  urls: [path + 'onmove.ogg', path + 'onmove.wav', path + 'onmove.mp3']
});

export const hoverCell = new Howl({
  urls: [path + 'hover.ogg', path + 'hover.wav', path + 'hover.mp3']
});

export const arrived = new Howl({
  urls: [path + 'arrived.ogg', path + 'arrived.wav', path + 'arrived.mp3']
});

export const loose1 = new Howl({
  urls: [path + 'loose1.ogg', path + 'loose1.wav', path + 'loose1.mp3']
});

export const loose2 = new Howl({
  urls: [path + 'loose2.ogg', path + 'loose2.wav', path + 'loose2.mp3']
});

//export const win1 = new Howl({
//  urls: [path + 'win1.ogg', path + 'win1.wav', path + 'win1.mp3']
//});

export const win2 = new Howl({
  urls: [path + 'win2.ogg', path + 'win2.wav', path + 'win2.mp3']
});

export const shape1 = new Howl({
  urls: [path + 'shape1.ogg', path + 'shape1.wav', path + 'shape1.mp3']
});

export const shape2 = new Howl({
  urls: [path + 'shape2.ogg', path + 'shape2.wav', path + 'shape2.mp3']
});

export const shape3 = new Howl({
  urls: [path + 'shape3.ogg', path + 'shape3.wav', path + 'shape3.mp3']
});

export const shape4 = new Howl({
  urls: [path + 'shape4.ogg', path + 'shape4.wav', path + 'shape4.mp3']
});

export const shape5 = new Howl({
  urls: [path + 'shape5.ogg', path + 'shape5.wav', path + 'shape5.mp3']
});
