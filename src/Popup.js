
const defaults = {
  timeout: 5000,
  raw: false,
  skippable: true
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
    this.container.innerHTML = opt.raw ? content : `<h1>${content}</h1>`;
    this.container.classList.add('open');
    if(opt.timeout){
      this.timer = window.setTimeout(() => this.hide(), opt.timeout);
    }
    if(opt.skippable){
      this.container.addEventListener('click', this.hide.bind(this));
    }
  }

  hide(){
    this.container.innerHTML = '';
    this.container.classList.remove('open');
    this.container.removeEventListener('click');
  }

}
