import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import EdgePermissionsService from '#servicespermissionsService.js';
import '../controls/permission-media-prompt.js';

const template = html<LocationPermissionPrompt>`
  <permission-media-prompt>
    <span slot="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname} wants to
    </span>
    <svg>
      <use href="img/edge/icons.svg#location-20-regular" />
    </svg>
    Know your location
  </permission-media-prompt>
`;

const styles = css``;

@customElement({ name: 'location-permission-prompt', template, styles })
export default class LocationPermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  _init = false;

  openChanged() {
    if (this.open) {
      if (!this._init) this._init = true;
    } else if (this._init) {
      this.ps.clearLocationRequest();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
  }

  setElements() {}

  addEventListeners() {
    // Prevent clicks from opening the omnibox.
    this.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.addEventListener('allow', () => this.ps.grantLocationAccess(true));
    this.addEventListener('allowOnce', () =>
      this.ps.grantLocationAccess(false),
    );
    this.addEventListener('block', () => {
      this.ps.denyLocationAccess();
    });
  }
}
