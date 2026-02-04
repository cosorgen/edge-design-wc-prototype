import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundCtrlNeutralPrimaryRest,
  paddingContentMedium,
  shadowFlyoutAmbient,
  shadowFlyoutKey,
} from '@mai-ui/design-tokens/tokens.js';
import { html, css, FASTElement, customElement } from '@microsoft/fast-element';

const template = html` Coupons available `;

const styles = css`
  :host {
    display: block;
    width: 256px;
    height: 300px;
    padding: ${paddingContentMedium};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyoutAmbient}, ${shadowFlyoutKey};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }
`;

@customElement({ name: 'shopping-flyout', template, styles })
export class ShoppingFlyout extends FASTElement {}
