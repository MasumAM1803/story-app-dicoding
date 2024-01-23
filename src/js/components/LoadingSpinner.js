import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class loadingSpinner extends LitWithoutShadowDom {
  static properties = {
    classes: { type: String, reflect: true },
    backgroundColor: { type: String, reflect: true },
    type: { type: String, reflect: true },
    blurred: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();

    this.classes = 'loading-container';
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('classes')) {
      throw new Error(`Atribut "classes" harus diterapkan pada elemen ${this.localName}`);
    }

    if (!this.hasAttribute('type')) {
      throw new Error(`Atribut "type" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    if (this.blurred) {
      return html`<div id="bgBlur" class="bg-blur"></div>
        <div id="loadingSpinner" class="${this.classes}" style="background-color: ${this.backgroundColor}"> 
          ${this._templateSpinner()}
        </div>
      `;
    } else {
      return html`
        <div id="loadingSpinner" class="${this.classes}" style="background-color: ${this.backgroundColor}"> 
          ${this._templateSpinner()}
        </div>
      `;
    }
  }

  _templateSpinner() {
    return html`
        <div class="${this.type} text-success" role="status"> 
            <span class="visually-hidden"> 
                Loading... 
            </span> 
        </div> 
    `;
  }
}

customElements.define('loading-spinner', loadingSpinner);
