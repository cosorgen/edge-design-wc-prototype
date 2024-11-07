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
import {
  borderRadiusLayerApp,
  colorLayerBackgroundApp,
  shadow2,
  strokeWidthThin,
} from '@phoenixui/themes';
import './edge-newtab.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { TabService, Tab } from '#servicestabService.js';

const edgePages: Record<string, ViewTemplate> = {
  newtab: html<Tab>`<edge-newtab ?active="${(x) => x.active}"></edge-newtab>`,
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
    border-radius: ${borderRadiusLayerApp};
    box-shadow: ${shadow2};
    overflow: hidden;

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
