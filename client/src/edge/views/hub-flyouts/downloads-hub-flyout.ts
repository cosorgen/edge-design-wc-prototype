import {
  customElement,
  FASTElement,
  html,
  css,
  Observable,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  borderRadiusLayerFlyout,
  colorNeutralForeground1,
  shadow28,
} from '@phoenixui/themes';
import WindowsService from '#services/windowsService.js';
import '../../../windows/controls/acrylic-material.js';

const template = html<DownloadsHubFlyout>`
  <acrylic-material></acrylic-material>
  <div>
    <img src="${(x) => x.getImageSource()}" alt="Download Icon" />
  </div>
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
    width: 368px;
    height: 298px;
  }

  img {
    width: 100%;
  }
`;

@customElement({ name: 'downloads-hub-flyout', template, styles })
export class DownloadsHubFlyout extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;

  connectedCallback() {
    super.connectedCallback();
    Observable.getNotifier(this.ws).subscribe(this);
  }

  disconnectedCallback() {
    Observable.getNotifier(this.ws).unsubscribe(this);
    super.disconnectedCallback();
  }

  handleChange(_: unknown, property: string) {
    if (property === 'theme') {
      this.$emit('theme-change');
    }
  }

  getImageSource() {
    return this.ws.theme === 'dark'
      ? './img/edge/download-dark.png'
      : './img/edge/download-light.png';
  }
}
