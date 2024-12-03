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
  _scrollerElement?: HTMLDivElement;
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
    this._scrollerElement = this.shadowRoot?.querySelector(
      '#scrollbar > div',
    ) as HTMLDivElement;
    this._resizeObserver = new ResizeObserver(this.setCSSVariables);
  }

  unsetElements(): void {
    this._scrollerElement = undefined;
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
      if (this._scrollerElement) {
        const scrollbarHeight =
          (1 / (this.scrollHeight / this.clientHeight)) * 100;

        const data = `:host {
          --scrollbar-height: ${scrollbarHeight}%;
          --viewport-height: ${this.clientHeight}px;
          --viewport-width: ${this.clientWidth}px;
        }

        @keyframes scroller { 
          from { top: 0%; } 
          to { top: calc(100% - ${scrollbarHeight}%); }
        }
        
        @keyframes scrollbar {
          from { top: 2px; } 
          to { top: calc(100% - ${this.clientHeight}px + 2px); } 
        }
          
        #scrollbar {
          display: ${scrollbarHeight < 100 ? 'block' : 'none'};
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
      }
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
