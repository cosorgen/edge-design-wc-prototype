import {
  FASTElement,
  customElement,
  html,
  css,
  repeat,
  when,
  ViewTemplate,
  Updates,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '../controls/web-page.js';
import {
  borderRadiusLayerBase,
  colorLayerBackgroundApp,
  shadow2,
  strokeWidthThin,
} from '@phoenixui/themes';
import './edge-newtab.js';
import './settings.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { TabService } from '#servicestabService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';

const edgePages: Record<string, ViewTemplate> = {
  newtab: html<string>`<edge-newtab
    ?active="${(x, c) => x === c.parent.ts.activeTabId}"
  ></edge-newtab>`,
  settings: html`<settings-page
    ?active="${(x, c) => x === c.parent.ts.activeTabId}"
  ></settings-page>`,
};

const template = html<WebContent>`
  ${repeat(
    (x) => x.ts.tabIds,
    html<string>`${when(
      (x, c) => c.parent.ts.tabsById[x].url.startsWith('edge://'),
      (x, c) => edgePages[c.parent.getHostname(c.parent.ts.tabsById[x].url)],
      html`<web-page
        id="${(x) => x}"
        page="${(x, c) => c.parent.ts.tabsById[x].page}"
        ?active="${(x, c) => x === c.parent.ts.activeTabId}"
        @pageload="${(x, c) => c.parent.handleTabLoad(x)}"
        @pageerror="${(x, c) => c.parent.handleTabLoadError(x)}"
      ></web-page>`,
    )}`,
  )}
`;

const styles = css`
  :host {
    flex: 1;
    display: flex;
    border-top: ${strokeWidthThin} solid ${colorLayerBackgroundApp};
    border-radius: ${borderRadiusLayerBase};
    box-shadow: ${shadow2};
    overflow: hidden;
    z-index: 0; /* ensure content is under omnibox */

    * {
      display: none;
    }

    [active] {
      display: unset;
    }
  }
`;

@customElement({
  name: 'web-content',
  template,
  styles,
})
export class WebContent extends FASTElement {
  @inject(TabService) ts!: TabService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @inject(EdgeWindowService) ews!: EdgeWindowService;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    if (this.$fastController.isConnected) {
      Updates.enqueue(() => {
        this.updateCoordinates();
      });
    }
  }

  addEventListeners(): void {
    const resizeObserver = new ResizeObserver(() => {
      this.updateCoordinates();
    });
    resizeObserver.observe(this);
  }

  getHostname(url: string): string {
    const urlObj = new URL(url);
    return urlObj.hostname;
  }

  handleTabLoad(id: string): void {
    this.ts.tabDidLoad(id);
  }

  handleTabLoadError(id: string): void {
    this.ts.tabLoadError(id);
  }

  updateCoordinates() {
    const { width, height, left, top } = this.getBoundingClientRect();
    this.ews.viewportSize = { width, height, left, top };
  }
}
