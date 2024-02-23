import { FASTElement, customElement, html } from '@microsoft/fast-element';
import {
  micaBackdropFilter,
  micaBackgroundBlendMode,
  micaBackgroundColor,
  phoenixLightThemeWin11,
  setTheme,
} from '@phoenixui/web-components';

const template = html`Edge`;

const styles = `
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background: ${micaBackgroundColor};
    backdrop-filter: ${micaBackdropFilter};
    background-blend-mode: ${micaBackgroundBlendMode};
  }
`;

@customElement({
  name: 'microsoft-edge',
  template,
  styles,
})
export class MicrosoftEdge extends FASTElement {
  connectedCallback() {
    super.connectedCallback();

    console.log('Microsoft Edge connected');

    // Set up edge design system
    setTheme(phoenixLightThemeWin11, this);
  }
}
