import {
  FASTElement,
  customElement,
  html,
  css,
  repeat,
  when,
  ViewTemplate,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '../controls/web-page.js';
import { colorLayerBackgroundApp, strokeWidthThin } from '@phoenixui/themes';
// import './edge-newtab.js';
import './edge-newtab-legacy.js';
import './settings.js';
import { TabService } from '#services/tabService.js';

const edgePages: Record<string, ViewTemplate> = {
  // newtab: html`<edge-newtab ?active="${(x) => x.active}"></edge-newtab>`,
  newtabLegacy: html`<edge-newtab-legacy
    ?active="${(x) => x.active}"
  ></edge-newtab-legacy>`,
  settings: html`<settings-page ?active="${(x) => x.active}"></settings-page>`,
};

const template = html<WebContent>`
  ${repeat(
    (x) => x.ts.tabs,
    html`${when(
      (x) => x.url.startsWith('edge://'),
      (x, c) => edgePages[c.parent.getHostname(x.url)],
      html`<web-page
        id="${(x) => x.id}"
        url="${(x) => x.url}"
        ?active="${(x) => x.active}"
        @pageload="${(x, c) => c.parent.handleTabLoad(x.id)}"
        @pageerror="${(x, c) => c.parent.handleTabLoadError(x.id)}"
      ></web-page>`,
    )}`,
    { positioning: true },
  )}
`;

const styles = css`
  :host {
    flex: 1;
    display: flex;
    border-top: ${strokeWidthThin} solid ${colorLayerBackgroundApp};
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

  getHostname(url: string): string {
    const urlObj = new URL(url);

    if (urlObj.hostname === 'settings') {
      return 'settings';
    }

    if (urlObj.hostname === 'newtab') {
      return 'newtabLegacy';
    }

    return urlObj.hostname;
  }

  handleTabLoad(id: string): void {
    this.ts.tabDidLoad(id);
  }

  handleTabLoadError(id: string): void {
    this.ts.tabLoadError(id);
  }
}
