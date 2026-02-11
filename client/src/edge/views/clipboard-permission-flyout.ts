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

const template = html<ClipboardPermissionFlyout>`
  <permission-action-prompt>
    <span slot="title">
      ${(x) =>
        x.ps.permissions.clipboard.permission === 'block'
          ? 'Clipboard read access denied'
          : 'Clipboard read access allowed'}
    </span>
    <span>
      ${(x) =>
        x.ps.permissions.clipboard.permission === 'block'
          ? `This site has been blocked from seeing text and images copied to the clipboard`
          : `This site can see text and images copied to the clipboard.`}
    </span>
    <mai-radio-group
      slot="controls"
      name="clipboard-permission"
      orientation="vertical"
      value="${(x) => (x.allow ? 'allow' : 'block')}"
    >
      <mai-field label-position="after">
        <label slot="label">
          ${(x) =>
            x.ps.permissions.clipboard.permission === 'block'
              ? `Always allow ${x.hostName} to see the clipboard`
              : `Continue allowing this site to see the clipboard`}
        </label>
        <mai-radio
          slot="input"
          name="clipboard-permission"
          value="allow"
          @click="${(x) => (x.allow = true)}"
        ></mai-radio>
      </mai-field>
      <mai-field label-position="after">
        <label slot="label">
          ${(x) =>
            x.ps.permissions.clipboard.permission === 'block'
              ? 'Continue blocking this site from seeing the clipboard'
              : `Always block ${x.hostName} from seeing the clipboard`}
        </label>
        <mai-radio
          slot="input"
          name="clipboard-permission"
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

@customElement({ name: 'clipboard-permission-flyout', template, styles })
export default class ClipboardPermissionFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable allow = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    this.allow = this.ps.permissions.clipboard.permission === 'allow';
  }

  openChanged() {
    this.allow = this.ps.permissions.clipboard.permission === 'allow';
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
        this.ps.grantClipboardAccess();
      } else {
        this.ps.denyClipboardAccess();
      }
      this.$emit('closemenu');
    });
  }

  @volatile
  get hostName() {
    return new URL(this.ts.tabsById[this.ts.activeTabId!].url).hostname;
  }
}
