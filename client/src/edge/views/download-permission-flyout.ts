import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
  observable,
  volatile,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import '../controls/permission-action-prompt.js';
import EdgePermissionsService from '#servicespermissionsService.js';
import '@mai-ui/radio-group/define.js';
import '@mai-ui/radio/define.js';
import '@mai-ui/field/define.js';

const template = html<DownloadPermissionFlyout>`
  <permission-action-prompt no-message>
    <span slot="title">
      ${(x) =>
        x.ps.permissions.download.permission === 'block'
          ? 'This site attempted to download multiple files automatically'
          : 'This site downloaded multiple files automatically'}
    </span>
    <mai-radio-group
      slot="controls"
      name="location-permission"
      orientation="vertical"
      value="${(x) => (x.allow ? 'allow' : 'block')}"
    >
      <mai-field label-position="after">
        <label slot="label">
          ${(x) =>
            x.ps.permissions.download.permission === 'block'
              ? `Always allow ${x.hostName} to download multiple files`
              : 'Continue allowing automatic downloads of multiple files'}
        </label>
        <mai-radio
          slot="input"
          name="location-permission"
          value="allow"
          @click="${(x) => (x.allow = true)}"
        ></mai-radio>
      </mai-field>
      <mai-field label-position="after">
        <label slot="label">
          ${(x) =>
            x.ps.permissions.download.permission === 'block'
              ? 'Continue blocking automatic downloads of multiple files'
              : `Always block automatic downloads on ${x.hostName}`}
        </label>
        <mai-radio
          slot="input"
          name="location-permission"
          value="block"
          @click="${(x) => (x.allow = false)}"
        ></mai-radio>
      </mai-field>
    </mai-radio-group>
  </permission-action-prompt>
`;

const styles = css`
  mai-field {
    align-items: flex-start;
  }
  mai-radio {
    margin-top: 6px;
  }
`;

@customElement({ name: 'download-permission-flyout', template, styles })
export default class DownloadPermissionFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable allow = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    this.allow = this.ps.permissions.download.permission === 'allow';
  }

  openChanged() {
    this.allow = this.ps.permissions.download.permission === 'allow';
  }

  addEventListeners() {
    // Prevent clicks from opening the omnibox.
    this.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.addEventListener('manage', () => {
      const id = this.ts.addTab();
      this.ts.navigateTab(
        id,
        `edge://settings/privacy/sitePermissions/allSites/siteDetails?site=${encodeURIComponent(this.ts.tabsById[this.ts.activeTabId!].url)}`,
      );
      this.ts.activateTab(id);
    });

    this.addEventListener('done', () => {
      if (this.allow) {
        this.ps.allowDownload();
      } else {
        this.ps.denyDownload();
      }
      this.$emit('closemenu');
    });
  }

  @volatile
  get hostName() {
    return new URL(this.ts.tabsById[this.ts.activeTabId!].url).hostname;
  }
}
