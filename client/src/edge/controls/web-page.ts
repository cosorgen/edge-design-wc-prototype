import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  observable,
} from '@microsoft/fast-element';
import { colorLayerBackgroundBase } from '@phoenixui/themes';

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
    background: ${colorLayerBackgroundBase};
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
  @attr url = '';
  @attr({ mode: 'boolean' }) active = false;
  @observable page = '';

  urlChanged() {
    this.loadWebPage();
  }

  loadWebPage() {
    fetch(`/api/proxy?url=${this.url}`)
      .then((res) => res.json())
      .then((res) => (this.page = res.page));
  }
}
