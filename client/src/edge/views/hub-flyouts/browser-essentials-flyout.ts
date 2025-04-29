import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundCtrlNeutralPrimaryRest,
  paddingContentMedium,
  shadowFlyout,
} from '@phoenixui/themes/kumo-tokens.js';
import { html, css, FASTElement, customElement } from '@microsoft/fast-element';

const template = html` Browser Essentials `;

const styles = css`
  :host {
    display: block;
    width: 256px;
    height: 300px;
    padding: ${paddingContentMedium};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyout};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }
`;

@customElement({ name: 'browser-essentials-flyout', template, styles })
export class BrowserEssentialsFlyout extends FASTElement {}
