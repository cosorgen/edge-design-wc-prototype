import { customElement, FASTElement, html, css } from '@microsoft/fast-element';

const template = html<SettingsPage>``;

const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%; /* Ensure it takes full height */
    overflow: auto; /* Enable scrolling */
  }
`;

@customElement({ name: 'settings-page', template, styles })
export class SettingsPage extends FASTElement {}
