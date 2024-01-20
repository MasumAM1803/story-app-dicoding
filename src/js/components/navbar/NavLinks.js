import { html } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class NavLinks extends LitWithoutShadowDom {
  render() {
    return html`
      <ul class="navbar-nav d-flex gap-2 gap-md-3 mt-2 mt-md-0">
        <nav-link content="Dashboard" to="/"></nav-link>
        <nav-link content="Add Story" to="/stories/add.html"></nav-link>
      </ul>
    `;
  }
}

customElements.define('nav-links', NavLinks);
