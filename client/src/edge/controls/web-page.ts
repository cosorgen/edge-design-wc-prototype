import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  observable,
  when,
} from '@microsoft/fast-element';

const template = html<WebPage>`
  ${when(
    (x) => x.page !== '',
    html`
      <iframe
        sandbox="allow-same-origin allow-scripts"
        srcdoc="${(x) => x.page}"
        @load="${(x) => x.addEventListenersToWebview()}"
      ></iframe>
    `,
  )}
`;

const styles = css`
  :host {
    flex: 1;
    display: none;
    background: white;
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
    } else {
      this.page = '';
    }
  }

  addEventListenersToWebview() {
    const iframeBody =
      this.shadowRoot?.querySelector('iframe')?.contentWindow?.document.body;
    if (!iframeBody) return;

    iframeBody.addEventListener('click', this.handleIframeEvent);
    iframeBody.addEventListener('mouseup', this.handleIframeEvent);
    iframeBody.addEventListener('mousedown', this.handleIframeEvent);
    iframeBody.addEventListener('keydown', this.handleIframeEvent);
    iframeBody.addEventListener('keyup', this.handleIframeEvent);
  }

  handleIframeEvent = (event: Event) => {
    this.$emit(event.type);
  };
}
