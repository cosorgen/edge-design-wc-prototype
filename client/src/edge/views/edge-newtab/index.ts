import { FASTElement, customElement } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { template } from './template.js';
import { styles } from './styles.js';

@customElement({
  name: 'edge-newtab',
  template,
  styles,
})
export class EdgeNewTab extends FASTElement {
  @inject(TabService) ts!: TabService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;

  handleComposerSubmit(e: Event): void {
    if (!(e instanceof CustomEvent)) return;

    const { url } = e.detail;
    if (!url) {
      return;
    }

    const activeTabId = this.ts.activeTabId;
    if (!activeTabId) {
      return;
    }

    this.ts.navigateTab(activeTabId, url);
  }

  handleLinkClick(url: string): void {
    if (this.ts.activeTabId) {
      this.ts.navigateTab(this.ts.activeTabId, url);
    }
  }
}
