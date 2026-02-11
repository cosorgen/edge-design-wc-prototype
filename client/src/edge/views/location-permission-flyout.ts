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

const template = html<LocationPermissionFlyout>`
  <permission-action-prompt no-message>
    <span slot="title">
      ${(x) =>
        x.ps.permissions.location.permission === 'block'
          ? 'Location access denied'
          : 'Location access allowed'}
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
            x.ps.permissions.location.permission === 'block'
              ? `Always allow ${x.hostName} to access your location`
              : 'Continue allowing this site to access your location'}
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
            x.ps.permissions.location.permission === 'block'
              ? 'Continue blocking this site from accessing your location'
              : `Always block ${x.hostName} from accessing your location`}
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

const styles = css``;

@customElement({ name: 'location-permission-flyout', template, styles })
export default class LocationPermissionFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable allow = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    this.allow = this.ps.permissions.location.permission === 'allow';
  }

  openChanged() {
    this.allow = this.ps.permissions.location.permission === 'allow';
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
        this.ps.grantLocationAccess();
      } else {
        this.ps.denyLocationAccess();
      }
      this.$emit('closemenu');
    });
  }

  @volatile
  get hostName() {
    return new URL(this.ts.tabsById[this.ts.activeTabId!].url).hostname;
  }
}
