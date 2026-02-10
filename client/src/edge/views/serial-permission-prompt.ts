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

const template = html<SerialPermissionPrompt>`
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
            <span>${(x) => `${x.name} (${x.id})`}</span>
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

@customElement({ name: 'serial-permission-prompt', template, styles })
export default class SerialPermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable availableDevices = [
    { name: 'Communications port', id: 'COM1' },
    { name: 'Communications port', id: 'COM2' },
    { name: 'Communications port', id: 'COM3' },
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
        'https://bing.com/search?q=serial+permissions+in+edge',
      );
    });
    this.addEventListener('connect', () => {
      const d = this.availableDevices.find((d) => d.id === this.selectedId);
      if (!d) {
        return;
      }
      this.ps.grantSerialAccess(d);
    });
    this.addEventListener('closemenu', () => {
      // clear request on close
      this.selectedId = undefined;
      this.ps.cancelSerialRequest();
    });
  }
}
