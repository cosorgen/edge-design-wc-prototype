import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  observable,
} from '@microsoft/fast-element';
import { colorLayerBackgroundDialog } from '@phoenixui/themes';

const template = html<WebPage>`
  <iframe
    sandbox="allow-same-origin allow-scripts"
    srcdoc="${(x) => x.page}"
  ></iframe>
`;

const styles = css`
  :host {
    flex: 1;
    display: none;
    background: ${colorLayerBackgroundDialog};
    overflow: hidden;
  }

  :host([active]) {
    display: block;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

@customElement({
  name: 'web-page',
  template,
  styles,
})
export class WebPage extends FASTElement {
  @attr url = 'edge://newtab';
  @attr({ mode: 'boolean' }) active = false;
  @observable page = '';

  urlChanged() {
    this.loadWebPage();
  }

  loadWebPage() {
    if (this.url.search('edge://') !== 0) {
      fetch(`/api/proxy?url=${this.url}`)
        .then((res) => res.text())
        .then((text) => (this.page = text));
    }
  }
}
