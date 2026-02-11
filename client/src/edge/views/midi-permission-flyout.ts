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

const template = html<MidiPermissionFlyout>`
  <permission-action-prompt
    ?no-message="${(x) => x.ps.permissions.midi.permission === 'block'}"
  >
    <span slot="title">
      ${(x) =>
        x.ps.permissions.midi.permission === 'block'
          ? 'Control and reprogramming of MIDI devices blocked'
          : 'Control and reprogramming of MIDI devices allowed'}
    </span>
    <span>
      ${(x) =>
        x.ps.permissions.midi.permission === 'block'
          ? ``
          : `This site can control and reprogram your MIDI devices`}
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
            x.ps.permissions.midi.permission === 'block'
              ? `Always allow ${x.hostName} to control and reprogram your MIDI devices`
              : 'Continue allowing this site to control and reprogram your MIDI devices'}
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
            x.ps.permissions.midi.permission === 'block'
              ? 'Continue blocking this site from controlling and reprogramming your MIDI devices'
              : `Always block ${x.hostName} from controlling and reprogramming your MIDI devices`}
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

@customElement({ name: 'midi-permission-flyout', template, styles })
export default class MidiPermissionFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable allow = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    this.allow = this.ps.permissions.midi.permission === 'allow';
  }

  openChanged() {
    this.allow = this.ps.permissions.midi.permission === 'allow';
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
        this.ps.grantMidiAccess();
      } else {
        this.ps.denyMidiAccess();
      }
      this.$emit('closemenu');
    });
  }

  @volatile
  get hostName() {
    return new URL(this.ts.tabsById[this.ts.activeTabId!].url).hostname;
  }
}
