import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  observable,
} from '@microsoft/fast-element';
import {
  borderRadiusLayerBase,
  colorLayerBackgroundBase,
  shadow2,
} from '@phoenixui/themes';

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
    border-radius: ${borderRadiusLayerBase};
    box-shadow: ${shadow2};
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

  connectedCallback() {
    super.connectedCallback();
    if (this.url.search('edge://') !== 0) {
      fetch(`/api/proxy?url=${this.url}`)
        .then((res) => res.text())
        .then((text) => (this.page = text));
    }
  }
}
