import { TabService } from '#servicestabService.js';
import {
  FASTElement,
  customElement,
  html,
  css,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '../controls/web-page.js';

const template = html<WebContent>`
  ${repeat(
    (x) => x.ts.tabs,
    html`<web-page
      url="${(x) => x.url}"
      ?active="${(x) => x.active}"
    ></web-page>`,
  )}
`;

const styles = css`
  :host {
    flex: 1;
    display: flex;
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
