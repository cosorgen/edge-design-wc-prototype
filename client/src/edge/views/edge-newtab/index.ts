import { FASTElement, Updates, customElement } from '@microsoft/fast-element';
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
  _resizeObserver?: ResizeObserver;
  _animationSheet?: CSSStyleSheet;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
    this.setCSSVariables();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.unsetElements();
  }

  setElements(): void {
    this._resizeObserver = new ResizeObserver(this.setCSSVariables);
  }

  unsetElements(): void {
    this._resizeObserver = undefined;
  }

  addEventListeners(): void {
    this._resizeObserver?.observe(this);
  }

  removeEventListeners(): void {
    this._resizeObserver?.disconnect();
  }

  setCSSVariables = () => {
    Updates.enqueue(() => {
      const data = `:host {
          --viewport-height: ${this.clientHeight}px;
          --viewport-width: ${this.clientWidth}px;
          --spacing-ntp-feed-peek: 160px;
        }`;

      const sheet = new CSSStyleSheet();
      sheet.replaceSync(data);

      if (!this._animationSheet) {
        this.shadowRoot?.adoptedStyleSheets.push(sheet);
      } else {
        this.shadowRoot?.adoptedStyleSheets.pop();
        this.shadowRoot?.adoptedStyleSheets.push(sheet);
      }

      // Save sheet for later removal
      this._animationSheet = sheet;
    });
  };

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
