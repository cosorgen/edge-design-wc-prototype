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

const template = html<BluetoothPermissionPrompt>`
  <permission-picker-prompt ?enable-connect="${(x) => !!x.selectedId}" scanning>
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

@customElement({ name: 'bluetooth-permission-prompt', template, styles })
export default class BluetoothPermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable availableDevices = [
    { name: 'Keyboard', id: 'bt-device-1', icon: 'cell-data-1' },
    { name: 'Mouse', id: 'bt-device-2', icon: 'cell-data-2' },
    { name: 'TV', id: 'bt-device-3', icon: 'cell-data-3' },
    { name: 'Phone', id: 'bt-device-4', icon: 'cell-data-4' },
    { name: 'Phone', id: 'bt-device-5', icon: 'cell-data-5' },
  ];
  @observable selectedId?: string;

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

    this.addEventListener('help', () => {
      const id = this.ts.addTab();
      this.ts.activateTab(id);
      this.ts.navigateTab(
        id,
        'https://bing.com/search?q=bluetooth+permissions+in+edge',
      );
    });
    this.addEventListener('connect', () => {
      const d = this.availableDevices.find((d) => d.id === this.selectedId);
      if (!d) {
        return;
      }
      this.ps.grantBluetoothAccess(d);
    });
    this.addEventListener('closemenu', () => {
      // clear request on close
      this.selectedId = undefined;
      this.ps.cancelBluetoothRequest();
    });
  }
}
