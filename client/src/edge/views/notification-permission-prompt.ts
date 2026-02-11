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

const template = html<NotificationPermissionPrompt>`
  <permission-media-prompt legacy-layout>
    <span slot="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname} wants to
    </span>
    <svg>
      <use href="img/edge/icons.svg#alert-20-regular" />
    </svg>
    Show notifications
  </permission-media-prompt>
`;

const styles = css``;

@customElement({ name: 'notification-permission-prompt', template, styles })
export default class NotificationPermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;

  openChanged() {}

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

    this.addEventListener('allow', () => this.ps.grantNotificationAccess());
    this.addEventListener('block', () => {
      this.ps.denyNotificationAccess();
    });
  }
}
