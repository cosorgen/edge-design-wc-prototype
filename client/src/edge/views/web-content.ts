import { TabService } from '#servicestabService.js';
import {
  FASTElement,
  customElement,
  html,
  css,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import './web-page.js';
import { colorLayerBackgroundApp, strokeWidthThin } from '@phoenixui/themes';

const template = html<WebContent>`
  ${repeat(
    (x) => x.ts.tabs,
    html`<web-page
      id="${(x) => x.id}"
      url="${(x) => x.url}"
      ?active="${(x) => x.active}"
    ></web-page>`,
    { positioning: true },
  )}
`;

const styles = css`
  :host {
    flex: 1;
    display: flex;
    border-top: ${strokeWidthThin} solid ${colorLayerBackgroundApp};
  }
`;

@customElement({
  name: 'web-content',
  template,
  styles,
})
export class WebContent extends FASTElement {
  @inject(TabService) ts!: TabService;
}
