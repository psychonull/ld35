import ReactDOM from 'react-dom';
import $ from 'jquery';
const defaults = {
  timeout: false,
  raw: false,
  skippable: false
};

export default class Popup {

  constructor(popupId){
    this.container = document.getElementById(popupId || 'popup');
    this.timer = null;
    if(!this.container){
      throw new Error('popup container not found');
    }
  }

  show(content, options){
    return new Promise((resolve) => {
      let opt = Object.assign({}, defaults, options);
      if(content){
        if(typeof content === 'object'){
          ReactDOM.render(content, this.container);
        }
        else {
          this.container.innerHTML = opt.raw ? content : `<h1>${content}</h1>`;
        }
      }
      this.container.classList.add('open');
      if(opt.timeout){
        this.timer = window.setTimeout(() => {this.hide(); resolve();}, opt.timeout);
      }
      this.clickHandler = () => this.hideAndResolve(resolve);
      if(opt.skippable){
        this.container.addEventListener('click', this.clickHandler);
      }
      if(opt.video){
        this.getVideo(opt.video).prependTo(this.container);
      }
    });
  }

  hideAndResolve(resolve){
    this.hide();
    resolve();
  }

  hide(clear){
    if(clear){
      this.container.innerHTML = '';
    }
    this.container.classList.remove('open');
    $(this.container).find('a').on('click', () => false); //HACK: avoid clickjackin'
    this.container.removeEventListener('click', this.clickHandler);
  }

  getVideo(name){
    return $(`<video id="bg-video" autoplay muted loop poster="//thumbs.gfycat.com/${name}-poster.jpg">
      <source type="video/webm" src="https://zippy.gfycat.com/${name}.webm">
      <source type="video/mp4" src="https://fat.gfycat.com/${name}.mp4">
    </video>`);
  }

}
