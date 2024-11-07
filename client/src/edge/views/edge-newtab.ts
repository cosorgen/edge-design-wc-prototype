import { html, css, customElement, FASTElement } from '@microsoft/fast-element';

export const template = html<EdgeNewtab>`<h1>Edge Newtab</h1>`;

export const styles = css`
  :host {
    display: block;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    background-color: white;
    padding: 1rem;
  }
`;

@customElement({
  name: 'edge-newtab',
  template,
  styles,
})
export class EdgeNewtab extends FASTElement {}
