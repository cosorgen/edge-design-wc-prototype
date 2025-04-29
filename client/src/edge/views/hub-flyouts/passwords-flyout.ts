import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundCtrlNeutralPrimaryRest,
  paddingContentMedium,
  shadowFlyout,
} from '@edge-design/kumo-theme/tokens.js';
import { html, css, FASTElement, customElement } from '@microsoft/fast-element';

const template = html` Passwords `;

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

@customElement({ name: 'passwords-flyout', template, styles })
export class PasswordsFlyout extends FASTElement {}
