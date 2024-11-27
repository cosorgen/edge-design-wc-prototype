import { css, html, FASTElement, customElement } from '@microsoft/fast-element';

const template = html<FigmaSlidesElement>`
  <iframe
    style="border: 1px solid rgba(0, 0, 0, 0.1);"
    width="100%"
    height="100%"
    src="https://embed.figma.com/proto/7oYu0FjQZgK7ftbHzYPIA2/Aurora-Mustafa-TPA?node-id=412-11751&node-type=canvas&scaling=scale-fit&content-scaling=fixed&page-id=33%3A4917&embed-host=share&hide-ui=true"
    allowfullscreen
    sandbox="allow-scripts allow-same-origin"
  >
  </iframe>
`;

const styles = css`
  :host {
    display: block;
    height: 100%;
    width: 100%;
    background: black;
  }
`;

@customElement({ name: 'figma-slides', template, styles })
export class FigmaSlidesElement extends FASTElement {
  focus() {
    const iframe = this.shadowRoot?.querySelector(
      'iframe',
    ) as HTMLIFrameElement;
    if (iframe) {
      iframe.contentWindow?.focus();
    }
  }
}
