import ProductTemplate from './product-comp.html';
import DropdownTemplate from './dropdown-template.html';

import CSSObject from './product-comp.css';

import {ApiHelper} from '../core/api-helper.js';

export class ProductComp extends HTMLElement{
  constructor(self){
    super(self);
    this.shadow = this.attachShadow(
      {mode:'open'}
    );
    this.productId = this.getAttribute('product-id');
    return self;
  }

  get productTemplate(){
    return '<style type="text/css">' + CSSObject.toString() + '</style>'+ eval('`'+ProductTemplate+'`');
  }

  get dropdownTemplate(){
    return eval('`'+DropdownTemplate+'`');
  }

  fetchProductData(){
    return null;
  }

  addProductToCart(){
    let apiresponse = ApiHelper.callApi('cart','POST',{},{
      'prouductId':this.productId,
    }).then((result)=>{
      console.log(result);
      if(!result || result.status >= 300){
        this.showFailureMessage();
      }else{
        return result.json();
      }
    }).catch(err=>{
      this.showFailureMessage();
      console.log(err);
    });

    console.log(apiresponse);
    apiresponse.then((value)=>{
      if(value.valid === true){
        this.showSuccessMessage();
      }else{
        this.showFailureMessage();
      }
      this.removeDisabledState();
    });
    
  }

  setDisabledState(){
    this.inputField.setAttribute('disabled',null);
    this.addButton.setAttribute('disabled', null);
    this.wishButton.setAttribute('disabled', null);
  }

  removeDisabledState(){
    this.inputField.removeAttribute('disabled');
    this.addButton.removeAttribute('disabled');
    this.wishButton.removeAttribute('disabled');
  }

  showSuccessMessage(){
    this.classList.add('product-added');
  }

  showFailureMessage(){
    this.classList.add('product-failed');
  }

  connectedCallback(){
    this.shadow.innerHTML = this.productTemplate;
    this.inputField = this.shadow.querySelector('.comp-cart-product-quantity');
    this.addButton = this.shadow.querySelector('.comp-cart-product-add-button');
    this.wishButton = this.shadow.querySelector('.comp-cart-product-wish-button');

    this._addListener = this.addButton.addEventListener('click',()=>{
      this.setDisabledState();
      this.addProductToCart();
    });
  }

}

const ProductCompComponent = window.customElements.define('product-component', ProductComp);
export default ProductCompComponent;