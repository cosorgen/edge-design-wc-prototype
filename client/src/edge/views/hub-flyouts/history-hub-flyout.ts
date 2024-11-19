import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import {
  borderRadiusLayerFlyout,
  colorNeutralForeground1,
  shadow28,
  spacingHorizontalS,
} from '@phoenixui/themes';
import '../../../windows/controls/acrylic-material.js';

const template = html<HistoryHubFlyout>`
  <acrylic-material></acrylic-material>
  <div>History</div>
`;

const styles = css`
  :host {
    position: relative;
    display: block;
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
    color: ${colorNeutralForeground1};
    overflow: hidden;
  }

  div {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 256px;
    max-width: 358px;
    min-height: 256px;
    padding: ${spacingHorizontalS};
  }

  img {
    width: 100%;
  }
`;

@customElement({ name: 'history-hub-flyout', template, styles })
export class HistoryHubFlyout extends FASTElement {}
