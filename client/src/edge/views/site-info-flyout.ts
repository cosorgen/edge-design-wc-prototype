import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
  repeat,
  when,
  ViewTemplate,
  volatile,
} from '@microsoft/fast-element';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  shadowFlyoutKey,
  shadowFlyoutAmbient,
  strokeFlyout,
  textStyleDefaultHeaderWeight,
  gapBetweenContentXSmall,
  gapBetweenContentXxSmall,
  paddingContentXSmall,
  ctrlListCornerRest,
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtleRest,
  textRampItemBodyFontSize,
  textStyleDefaultRegularWeight,
  textStyleDefaultRegularFontFamily,
  paddingContentXxSmall,
  textStyleDataVizHeaderWeight,
  textStyleDataVizHeaderFontFamily,
  textGlobalCaption1FontSize,
  foregroundCtrlNeutralSecondaryRest,
  foregroundCtrlNeutralPrimaryRest,
} from '@mai-ui/design-tokens/tokens.js';
import {
  ctrlDialogPadding,
  strokeWidthCardDefault,
} from '@mai-ui/design-tokens/mai-tokens.js';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import '@mai-ui/button/define.js';
import '@mai-ui/divider/define.js';
import EdgePermissionsService from '#servicespermissionsService.js';
import '../controls/site-info-permission-item.js';
import '../controls/site-info-permission-device.js';

const permissionItemsByKey: Record<
  string,
  (permission: {
    state?: string;
    permission?: string;
    allowedDevices?: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
  }) => ViewTemplate
> = {
  camera: (permission) =>
    html`<site-info-permission-item
      type="camera"
      ?checked="${permission.state === 'active'}"
    ></site-info-permission-item>`,
  microphone: (permission) =>
    html`<site-info-permission-item
      type="microphone"
      ?checked="${permission.state === 'active'}"
    ></site-info-permission-item>`,
  usb: (permission) =>
    html`${repeat(
      permission.allowedDevices!,
      html`<site-info-permission-device
        type="usb"
        id="${(x) => x.id}"
        deviceName="${(x) => x.name}"
        deviceIcon="${(x) => x.icon}"
      ></site-info-permission-device>`,
    )}`,
  bluetooth: (permission) =>
    html`${repeat(
      permission.allowedDevices!,
      html`<site-info-permission-device
        type="bluetooth"
        id="${(x) => x.id}"
        deviceName="${(x) => x.name}"
        deviceIcon="${(x) => x.icon}"
      ></site-info-permission-device>`,
    )}`,
  serial: (permission) =>
    html`${repeat(
      permission.allowedDevices!,
      html`<site-info-permission-device
        type="serial"
        id="${(x) => x.id}"
        deviceName="${(x) => x.name}"
        deviceIcon="serial-port"
      ></site-info-permission-device>`,
    )}`,
  popup: (permission) =>
    html`<site-info-permission-item
      type="popup"
      ?checked="${permission.permission !== 'block'}"
    ></site-info-permission-item>`,
  location: (permission) =>
    html`<site-info-permission-item
      type="location"
      ?checked="${permission.permission !== 'block'}"
    ></site-info-permission-item>`,
  download: (permission) =>
    html`<site-info-permission-item
      type="download"
      ?checked="${permission.permission !== 'block'}"
    ></site-info-permission-item>`,
  midi: (permission) =>
    html`<site-info-permission-item
      type="midi"
      ?checked="${permission.permission !== 'block'}"
    ></site-info-permission-item>`,
  clipboard: (permission) =>
    html`<site-info-permission-item
      type="clipboard"
      ?checked="${permission.permission !== 'block'}"
    ></site-info-permission-item>`,
  notification: (permission) =>
    html`<site-info-permission-item
      type="notification"
      ?checked="${permission.permission !== 'block'}"
    ></site-info-permission-item>`,
};

const template = html<SiteInfoFlyout>`
  <div part="header">
    <div id="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname}
    </div>
    <mai-button
      appearance="subtle"
      @click="${(x) => {
        x.$emit('closemenu');
      }}"
      icon-only
    >
      <svg>
        <use href="img/edge/icons.svg#dismiss-20-regular" />
      </svg>
    </mai-button>
  </div>
  <div part="body">
    <div class="menu-section">
      <button class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#lock-closed-20-regular" />
        </svg>
        <div>Connection is secure</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
    </div>
    <mai-divider appearance="subtle"></mai-divider>
    <div class="menu-section">
      <button class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#breifcase-20-regular" />
        </svg>
        <div>Microsoft Purview</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
    </div>
    <mai-divider appearance="subtle"></mai-divider>
    ${when(
      (x) => x.permissionsInFlyout.length > 0,
      html`<div class="menu-section">
          <div class="section-header">Permissions for this site</div>
          ${repeat(
            (x) => x.permissionsInFlyout,
            html`${(x) => permissionItemsByKey[x.key](x.permission)}`,
          )}
          <div class="menu-item">
            <mai-button
              appearance="outline"
              @click="${(x) => x.ps.resetPermissions()}"
            >
              Reset permission
            </mai-button>
          </div>
        </div>
        <mai-divider appearance="subtle"></mai-divider>`,
    )}
    <div class="menu-section">
      <button class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#cookies-20-regular" />
        </svg>
        <div>Cookies and site data</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
      <button class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#settings-20-regular" />
        </svg>
        <div>Site settings</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
    </div>
    <mai-divider appearance="subtle"></mai-divider>
    <div class="menu-section">
      <div class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#video-security-20-regular" />
        </svg>
        <div>Tracking prevention for this site</div>
        <mai-switch checked></mai-switch>
      </div>
      <button class="menu-item">
        <svg></svg>
        <div>Trackers (0 blocked)</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
    </div>
  </div>
`;

const styles = css`
  :host {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXSmall};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyoutAmbient}, ${shadowFlyoutKey};
    border: ${strokeWidthCardDefault} solid ${strokeFlyout};
    overflow: hidden;
    padding-block: ${ctrlDialogPadding};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  [part='header'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: ${textStyleDefaultHeaderWeight};
    padding-inline: ${ctrlDialogPadding};
  }

  [part='body'] {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXxSmall};
  }

  .menu-section {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXxSmall};
    padding-inline: ${ctrlDialogPadding};
    padding-block: ${paddingContentXxSmall};
  }

  .section-header {
    font-family: ${textStyleDataVizHeaderFontFamily};
    font-size: ${textGlobalCaption1FontSize};
    font-weight: ${textStyleDataVizHeaderWeight};
    color: ${foregroundCtrlNeutralSecondaryRest};
    padding-inline: ${paddingContentXSmall};
  }

  .menu-item {
    all: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXSmall};
    padding: ${paddingContentXSmall};
    border-radius: ${ctrlListCornerRest};
    background: ${backgroundCtrlSubtleRest};

    div {
      flex: 1;
      font-family: ${textStyleDefaultRegularFontFamily};
      font-size: ${textRampItemBodyFontSize};
      font-weight: ${textStyleDefaultRegularWeight};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  button.menu-item:hover {
    cursor: pointer;
    background-color: ${backgroundCtrlSubtleHover};
  }
`;

@customElement({ name: 'site-info-flyout', template, styles })
export default class SiteInfoFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
  }

  addEventListeners() {
    this.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    this.addEventListener('togglepermission', (e: Event) => {
      if (!(e instanceof CustomEvent)) return;
      this.togglePermission(e);
    });
  }

  @volatile
  get permissionsInFlyout() {
    return (
      this.ps.permissionPriority as Array<keyof typeof this.ps.permissions>
    )
      .filter(
        (key) =>
          this.ps.permissions[key].permission !==
            this.ps.permissions[key].default ||
          this.ps.permissions[key].state === 'active',
      )
      .map((key) => ({
        key,
        permission: this.ps.permissions[key],
      }));
  }

  togglePermission(e: CustomEvent) {
    const { type } = e.detail;
    switch (type) {
      case 'camera': {
        if (this.ps.permissions.camera.permission !== 'block') {
          this.ps.denyCameraAccess();
        } else {
          this.ps.grantCameraAccess(true);
        }
        break;
      }
      case 'microphone': {
        if (this.ps.permissions.microphone.permission !== 'block') {
          this.ps.denyMicrophoneAccess();
        } else {
          this.ps.grantMicrophoneAccess(true);
        }
        break;
      }
      case 'usb': {
        const { id } = e.detail;
        this.ps.denyUsbAccess(id);
        break;
      }
      case 'bluetooth': {
        const { id } = e.detail;
        this.ps.denyBluetoothAccess(id);
        break;
      }
      case 'serial': {
        const { id } = e.detail;
        this.ps.denySerialAccess(id);
        break;
      }
      case 'popup': {
        if (this.ps.permissions.popup.permission !== 'block') {
          this.ps.denyPopup();
        } else {
          this.ps.allowPopup();
        }
        break;
      }
      case 'location': {
        if (this.ps.permissions.location.permission !== 'block') {
          this.ps.denyLocationAccess();
        } else {
          this.ps.grantLocationAccess(true);
        }
        break;
      }
      case 'download': {
        if (this.ps.permissions.download.permission !== 'block') {
          this.ps.denyDownload();
        } else {
          this.ps.allowDownload();
        }
        break;
      }
      case 'midi': {
        if (this.ps.permissions.midi.permission !== 'block') {
          this.ps.denyMidiAccess();
        } else {
          this.ps.grantMidiAccess();
        }
        break;
      }
      case 'clipboard': {
        if (this.ps.permissions.clipboard.permission !== 'block') {
          this.ps.denyClipboardAccess();
        } else {
          this.ps.grantClipboardAccess();
        }
        break;
      }
      case 'notification': {
        if (this.ps.permissions.notification.permission !== 'block') {
          this.ps.denyNotificationAccess();
        } else {
          this.ps.grantNotificationAccess();
        }
        break;
      }
    }
  }
}
