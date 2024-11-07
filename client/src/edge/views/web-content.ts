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
import './edge-newtab.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { TabService, Tab } from '#servicestabService.js';

const edgePages: Record<string, ViewTemplate> = {
  newtab: html<string>`<edge-newtab
    ?active="${(x, c) => x === c.parent.ts.activeTabId}"
  ></edge-newtab>`,
};

const template = html<WebContent>`
  ${repeat(
    (x) => x.ts.tabs,
    html<Tab>`${when(
      (x) => x.url.startsWith('edge://'),
      (x, c) => edgePages[c.parent.getHostname(x.url)],
      html`<web-page
        id="${(x) => x.id}"
        ?active="${(x) => x.active}"
        url="${(x) => x.url}"
      ></web-page>`,
    )}`,
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
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;

  getHostname(url: string): string {
    const urlObj = new URL(url);
    return urlObj.hostname;
  }
}
