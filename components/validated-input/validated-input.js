export class ValidatedInput extends HTMLInputElement{
  constructor(self) {
    super(self);
    return self;
  }

  get validationPattern() {
    return this.getAttribute('validation-pattern');
  }

  get errorMessage() {

  }

  keyupEvent(event){
    console.log('default behavior', event);
  }

  onValid(){}
  onInvalid(){}

  connectedCallback(){
    this.keyupListener = document.addEventListener('keyup', this.keyupEvent);
    console.log('conected');
  }

  disconnectedCallback(){
    document.removeEventListener('keyup', this.keyupEvent);
  }
}

const ValidatedInputComponent = window.customElements.define('validated-input', ValidatedInput, {extends:'input'});
export default ValidatedInputComponent;