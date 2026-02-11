import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
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
          ?checked="${(x) => x.ps.permissions.popup.permission === 'allow'}"
          @click="${(x) => (x._allow = true)}"
        ></mai-radio>
      </mai-field>
      <mai-field label-position="after">
        <label slot="label"> Continue blocking </label>
        <mai-radio
          slot="input"
          name="popup-permission"
          value="block"
          ?checked="${(x) => x.ps.permissions.popup.permission === 'block'}"
          @click="${(x) => (x._allow = false)}"
        ></mai-radio>
      </mai-field>
    </mai-radio-group>
  </permission-action-prompt>
`;

const styles = css``;

@customElement({ name: 'popup-blocked-flyout', template, styles })
export default class PopupBlockedFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  _allow = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    this._allow = this.ps.permissions.popup.permission === 'allow';
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
      if (this._allow) {
        this.ps.allowPopup();
      } else {
        this.ps.denyPopup();
      }
      this.$emit('closemenu');
    });
  }
}
