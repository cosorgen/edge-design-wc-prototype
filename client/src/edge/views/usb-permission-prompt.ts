import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
  observable,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import EdgePermissionsService from '#servicespermissionsService.js';
import '../controls/permission-picker-prompt.js';
import '@mai-ui/tree/define.js';
import '@mai-ui/tree-item/define.js';

const template = html<UsbPermissionPrompt>`
  <permission-picker-prompt ?enable-connect="${(x) => !!x.selectedId}">
    <span slot="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname} wants to
    </span>
    <mai-tree>
      ${repeat(
        (x) => x.availableDevices,
        html`
          <mai-tree-item
            @click="${(x, c) => (c.parent.selectedId = x.id)}"
            ?selected="${(x, c) => c.parent.selectedId === x.id}"
            empty
          >
            <svg slot="start">
              <use href="img/edge/icons.svg#${(x) => x.icon}-20-regular" />
            </svg>
            <span>${(x) => x.name}</span>
          </mai-tree-item>
        `,
      )}
    </mai-tree>
  </permission-picker-prompt>
`;

const styles = css`
  mai-tree-item::part(chevron) {
    display: none;
  }
`;

@customElement({ name: 'usb-permission-prompt', template, styles })
export default class UsbPermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable availableDevices = [
    { name: 'Keyboard', id: 'usb-device-1', icon: 'placeholder' },
    { name: 'Mouse', id: 'usb-device-2', icon: 'placeholder' },
    { name: 'Drive', id: 'usb-device-3', icon: 'placeholder' },
  ];
  @observable selectedId?: string;
  _init = false;

  openChanged() {
    if (this.open) {
      if (!this._init) this._init = true;
    } else if (this._init) {
      this.selectedId = undefined;
      this.ps.clearUsbRequest();
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

    this.addEventListener('help', () => {
      const id = this.ts.addTab();
      this.ts.activateTab(id);
      this.ts.navigateTab(
        id,
        'https://bing.com/search?q=usb+permissions+in+edge',
      );
    });
    this.addEventListener('connect', () => {
      const d = this.availableDevices.find((d) => d.id === this.selectedId);
      if (!d) {
        return;
      }
      this.ps.grantUsbAccess(d);
    });
  }
}
