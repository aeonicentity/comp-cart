import CSSObject from './ui-message.css';

export class UiMessage extends HTMLElement{
  constructor(self) {
    super(self);
    this.shadow = this.attachShadow(
      {mode:'open'}
    );
    return self;
  }

  get messageId(){
    return this.getAttribute('msg-id');
  }

  get msgActive(){
    return this.hasAttribute(' msg-active');
  }

  activateMsg(){
    this.setAttribute('msg-active', true);
  }

  clearMsg(){
    this.removeAttribute('msg-active');
  }

  connectedCallback(){
    this.shadow.innerHTML = `<style>${CSSObject}</style>`;
  }
}

const UiMessageComponent = window.customElements.define('ui-message', UiMessage);
export default UiMessageComponent;