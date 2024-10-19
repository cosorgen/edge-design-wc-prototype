import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  observable,
} from '@microsoft/fast-element';

const template = html<WebPage>`
  <iframe
    sandbox="allow-same-origin allow-scripts"
    srcdoc="${(x) => x.page}"
    @load="${(x) => x.handlePageLoad()}"
  ></iframe>
`;

const styles = css`
  :host {
    flex: 1;
    background: white;
    overflow: hidden;
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
  @observable page = '';
  _iframeDocumentBody: HTMLBodyElement | null = null;

  setElements() {
    const iframe = this.shadowRoot?.querySelector(
      'iframe',
    ) as HTMLIFrameElement;

    if (!iframe) return;
    this._iframeDocumentBody = iframe.contentWindow?.document
      .body as HTMLBodyElement;
  }

  unsetElements() {
    this._iframeDocumentBody = null;
  }

  addEventListeners() {
    this._iframeDocumentBody!.addEventListener('click', this.handleIframeEvent);
    this._iframeDocumentBody!.addEventListener(
      'mouseup',
      this.handleIframeEvent,
    );
    this._iframeDocumentBody!.addEventListener(
      'mousedown',
      this.handleIframeEvent,
    );
    this._iframeDocumentBody!.addEventListener(
      'keydown',
      this.handleIframeEvent,
    );
    this._iframeDocumentBody!.addEventListener('keyup', this.handleIframeEvent);
  }

  removeEventListeners() {
    this._iframeDocumentBody!.removeEventListener(
      'click',
      this.handleIframeEvent,
    );
    this._iframeDocumentBody!.removeEventListener(
      'mouseup',
      this.handleIframeEvent,
    );
    this._iframeDocumentBody!.removeEventListener(
      'mousedown',
      this.handleIframeEvent,
    );
    this._iframeDocumentBody!.removeEventListener(
      'keydown',
      this.handleIframeEvent,
    );
    this._iframeDocumentBody!.removeEventListener(
      'keyup',
      this.handleIframeEvent,
    );
  }

  urlChanged() {
    this.loadWebPage();
  }

  loadWebPage() {
    if (!this.url) return;
    if (this.page) this.handlePageUnload();

    fetch(`/api/proxy?url=${this.url}`, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) this.handlePageError(res);
        return res.text();
      })
      .then((text) => (this.page = text));
  }

  handlePageUnload() {
    this.$emit('pageunload');
    this.removeEventListeners();
    this.unsetElements();
  }

  handlePageLoad() {
    if (!this.page) return;

    this.$emit('pageload');
    setTimeout(() => {
      this.setElements();
      this.addEventListeners();
    }, 500);
  }

  handlePageError(res: Response) {
    this.$emit('pageerror');
    throw new Error(`Error fetching page: ${res.text()}`);
  }

  handleIframeEvent = (event: Event) => {
    this.$emit(event.type);
  };
}
