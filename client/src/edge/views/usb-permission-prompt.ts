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
    { name: 'USB Device 1', id: 'device-1', icon: 'placeholder' },
    { name: 'USB Device 2', id: 'device-2', icon: 'placeholder' },
    { name: 'USB Device 3', id: 'device-3', icon: 'placeholder' },
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

    this.addEventListener('allow', () => {});
    this.addEventListener('closemenu', () => {
      // clear request on close
      this.selectedId = undefined;
    });
  }
}
