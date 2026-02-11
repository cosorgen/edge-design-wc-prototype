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

const template = html<DownloadPermissionPrompt>`
  <permission-media-prompt legacy-layout>
    <span slot="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname} wants to
    </span>
    <svg>
      <use href="img/edge/icons.svg#arrow-download-20-regular" />
    </svg>
    Download multiple files
  </permission-media-prompt>
`;

const styles = css``;

@customElement({ name: 'download-permission-prompt', template, styles })
export default class DownloadPermissionPrompt extends FASTElement {
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

    this.addEventListener('allow', () => this.ps.allowDownload());
    this.addEventListener('block', () => {
      this.ps.denyDownload();
    });
  }
}
