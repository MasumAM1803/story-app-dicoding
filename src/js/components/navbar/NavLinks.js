import { html } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class NavLinks extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <ul class="navbar-nav d-flex gap-2 gap-md-3 mt-2 mt-md-0">
        <nav-link content="${msg(`Dashboard`)}" to="/"></nav-link>
        <nav-link content="${msg(`Add Story`)}" to="/stories/add.html"></nav-link>
        <nav-link-auth class="d-none" id="userLoggedMenu"></nav-link-auth>
        <nav-link content="${msg(`Login`)}" to="/auth/login.html" id="loginMenu"></nav-link>
      </ul>
    `;
  }
}

customElements.define('nav-links', NavLinks);
