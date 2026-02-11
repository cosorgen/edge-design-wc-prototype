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
import '../controls/permission-action-prompt.js';
import EdgePermissionsService from '#servicespermissionsService.js';
import '@mai-ui/radio-group/define.js';
import '@mai-ui/radio/define.js';
import '@mai-ui/link/define.js';
import '@mai-ui/field/define.js';

const template = html<PopupBlockedFlyout>`
  <permission-action-prompt>
    <span slot="title"> Pop-ups blocked </span>
    <mai-link
      href="https://${(x) =>
        new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname}/"
      target="_blank"
      rel="noopener"
    >
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname}
    </mai-link>
    <mai-radio-group
      slot="controls"
      name="popup-permission"
      orientation="vertical"
      value="${(x) => (x.allow ? 'allow' : 'block')}"
    >
      <mai-field label-position="after">
        <label slot="label">
          Always allow pop-ups and redirects from
          ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname}
        </label>
        <mai-radio
          slot="input"
          name="popup-permission"
          value="allow"
          @click="${(x) => (x.allow = true)}"
        ></mai-radio>
      </mai-field>
      <mai-field label-position="after">
        <label slot="label"> Continue blocking </label>
        <mai-radio
          slot="input"
          name="popup-permission"
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

@customElement({ name: 'popup-blocked-flyout', template, styles })
export default class PopupBlockedFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable allow = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    this.allow = this.ps.permissions.popup.permission === 'allow';
  }

  openChanged() {
    if (!this.open) {
      this.allow = this.ps.permissions.popup.permission === 'allow';
    }
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
        this.ps.allowPopup();
      } else {
        this.ps.denyPopup();
      }
      this.$emit('closemenu');
    });
  }
}
