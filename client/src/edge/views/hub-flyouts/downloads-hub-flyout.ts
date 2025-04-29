import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundCtrlNeutralPrimaryRest,
  shadowLayer,
  paddingContentMedium,
} from '@edge-design/kumo-theme/tokens.js';

const template = html<DownloadsMenu>` Downloads TBD `;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    width: 368px;
    height: 298px;
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowLayer};
    color: ${foregroundCtrlNeutralPrimaryRest};
    padding: ${paddingContentMedium};
    overflow: hidden;
  }

  div {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 360px;
    height: 207px;
  }

  img {
    width: 100%;
  }
`;

@customElement({ name: 'downloads-menu', template, styles })
export class DownloadsMenu extends FASTElement {}
