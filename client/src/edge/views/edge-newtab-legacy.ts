import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '@phoenixui/web-components/button.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { TabService } from '#servicestabService.js';

const template = html<EdgeNewTab>`Legacy new tab page`;

const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

@customElement({
  name: 'edge-newtab-legacy',
  template,
  styles,
})
export class EdgeNewTab extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(TabService) ts!: TabService;

  handleLinkClick(url: string): void {
    this.ts.navigateActiveTab(url);
  }
}
