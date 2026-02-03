import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '../controls/sidepane-header.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { backgroundWebPagePrimary } from '@phoenixui/themes/smtc-tokens.js';

const template = html<SearchSidepane>`<sidepane-header
  @close="${(x) => x.handleClose()}"
>
  Search
</sidepane-header>`;

const styles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: ${backgroundWebPagePrimary};
  }
`;

@customElement({ name: 'search-sidepane', template, styles })
export class SearchSidepane extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  handleClose(): void {
    this.ews.closeSidepaneApp();
  }
}
