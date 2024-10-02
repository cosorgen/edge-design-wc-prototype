import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerFlyout,
  shadow28,
} from '@phoenixui/themes';

const template = html<ExtensionsHub>` <img
  src="./img/edge/extensions.png"
  width="308px"
  height="249px"
/>`;

const styles = css`
  :host {
    display: block;
    min-width: 200px;
    min-height: 200px;
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
  }
`;

@customElement({
  name: 'extensions-hub',
  template,
  styles,
})
export class ExtensionsHub extends FASTElement {}
