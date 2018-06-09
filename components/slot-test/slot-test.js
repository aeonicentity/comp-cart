import HtmlTemplate from './slot-test.html';

export class SlotTest extends HTMLElement{
  constructor(self){
    super(self);
    this.shadow = this.attachShadow(
      {mode:'open'}
    );
    return self;
  }

  connectedCallback(){
    this.shadow.innerHTML = eval('`'+HtmlTemplate+'`');
  }
}

const SlotTestComponent = window.customElements.define('slot-test', SlotTest);
export default SlotTestComponent;