import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
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
  @attr page: string = '';
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
      'mousemove',
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
      'mousemove',
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

  handlePageUnload() {
    this.$emit('pageunload');
    this.removeEventListeners();
    this.unsetElements();
  }

  handlePageLoad() {
    setTimeout(() => {
      this.setElements();
      this.addEventListeners();
    }, 500);

    this.$emit('pageload');
  }

  handlePageError(res: Response) {
    this.$emit('pageerror');
    throw new Error(`Error fetching page: ${res.text()}`);
  }

  handleIframeEvent = (event: Event) => {
    let newEvent = new Event('iframeevent');
    switch (event.type) {
      case 'click':
        newEvent = new MouseEvent('click', event);
        break;
      case 'mouseup':
        newEvent = new MouseEvent('mouseup', event);
        break;
      case 'mousedown':
        newEvent = new MouseEvent('mousedown', event);
        break;
      case 'mousemove':
        newEvent = new MouseEvent('mousemove', event);
        break;
      case 'keydown':
        newEvent = new KeyboardEvent('keydown', event);
        break;
      case 'keyup':
        newEvent = new KeyboardEvent('keyup', event);
        break;
      default:
        break;
    }

    this.dispatchEvent(newEvent);
  };
}
