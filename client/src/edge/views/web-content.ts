import {
  FASTElement,
  customElement,
  html,
  css,
  observable,
} from '@microsoft/fast-element';
import {
  borderRadiusLayerBase,
  colorLayerBackgroundBase,
  shadow2,
} from '@phoenixui/themes';

const template = html<WebContent>`
  <iframe
    sandbox="allow-same-origin allow-scripts"
    srcdoc="${(x) => x.page}"
  ></iframe>
`;

const styles = css`
  :host {
    flex: 1;
    display: block;
    background: ${colorLayerBackgroundBase};
    border-radius: ${borderRadiusLayerBase};
    box-shadow: ${shadow2};
    overflow: hidden;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

@customElement({
  name: 'web-content',
  template,
  styles,
})
export class WebContent extends FASTElement {
  url = 'https://www.microsoft.com';
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
