import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class ModalDetail extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
  };

  render() {
    return html`
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${this.title}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between align-items-center">
              <h1 id="nameDetailRecord"></h1>
              <p id="dateDetailRecord"></p>
            </div>
            <div class="mb-3">
              <img src="" id="imgDetailRecord" class="img-fluid" alt="${this.name}" />
            </div>
            <div>
              <p id="descriptionDetailRecord"></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-detail', ModalDetail);
