import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  spacingHorizontalL,
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerDialog,
  colorNeutralForeground1,
  shadow28,
} from '@edge-design/phoenix-theme';

const template = html` Coupons available `;

const styles = css`
  :host {
    display: block;
    width: 256px;
    height: 300px;
    padding: ${spacingHorizontalL};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerDialog};
    box-shadow: ${shadow28};
    color: ${colorNeutralForeground1};
  }
`;

@customElement({ name: 'shopping-flyout', template, styles })
export class ShoppingFlyout extends FASTElement {}
