import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
  observable,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import '../controls/camera-permission-card.js';
import '../controls/permission-media-prompt.js';
import EdgePermissionsService from '#servicespermissionsService.js';
import CameraPermissionCard from '../controls/camera-permission-card.js';

const template = html<CameraPermissionPrompt>`
  <media-prompt>
    <span slot="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname} wants to
    </span>
    <svg>
      <use href="img/edge/icons.svg#video-20-regular" />
    </svg>
    Use available cameras (${(x) => x.camCard?.cams.length})
    <span slot="cards">
      <camera-permission-card></camera-permission-card>
    </span>
  </media-prompt>
`;

const styles = css``;

@customElement({ name: 'camera-permission-prompt', template, styles })
export default class CameraPermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable camCard?: CameraPermissionCard;

  openChanged() {
    if (this.open) {
      this.camCard?.updateCameraList();
      this.camCard?.openCameraFeed();
    } else {
      this.camCard?.closeCameraFeed();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
  }

  setElements() {
    this.camCard = this.shadowRoot!.querySelector('camera-permission-card')!;
  }

  addEventListeners() {
    // Prevent clicks from opening the omnibox.
    this.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.addEventListener('allow', () => this.ps.grantCameraAccess(true));
    this.addEventListener('allowOnce', () => this.ps.grantCameraAccess(false));
    this.addEventListener('block', () => {
      this.ps.denyCameraAccess();
      this.camCard?.closeCameraFeed();
    });
  }
}
