import ReactDOM from 'react-dom';
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
      this.timer = window.setTimeout(() => this.hide(), opt.timeout);
    }
    if(opt.skippable){
      this.container.addEventListener('click', () => this.hide());
    }
  }

  hide(clear){
    if(clear){
      this.container.innerHTML = '';
    }
    this.container.classList.remove('open');
    this.container.removeEventListener('click');
  }

}
