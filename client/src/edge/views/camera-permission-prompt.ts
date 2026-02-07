import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
  observable,
  repeat,
} from '@microsoft/fast-element';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  shadowFlyoutKey,
  shadowFlyoutAmbient,
  strokeFlyout,
  textStyleDefaultHeaderWeight,
  gapBetweenContentXSmall,
  cornerCtrlRest,
  strokeCardOnPrimaryRest,
  backgroundLayerTertiary,
  paddingContentXSmall,
  backgroundCardOnPrimaryDefaultRest,
  backgroundSmoke,
} from '@mai-ui/design-tokens/tokens.js';
import {
  cornerCardDefault,
  ctrlDialogPadding,
  paddingCardDefault,
  strokeWidthCardDefault,
} from '@mai-ui/design-tokens/mai-tokens.js';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import '@mai-ui/button/define.js';
import '@mai-ui/badge/define.js';
import '@mai-ui/dropdown/define.js';
import '@mai-ui/option/define.js';
import '@mai-ui/listbox/define.js';
import '@mai-ui/spinner/define.js';
import EdgePermissionsService from '#servicespermissionsService.js';

const template = html<CameraPermissionPrompt>`
  <div part="header">
    <div id="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname} wants to
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
    <div id="message">
      <svg>
        <use href="img/edge/icons.svg#video-20-regular" />
      </svg>
      Use available cameras (${(x) => x.cams.length})
    </div>
    <div id="card-container">
      <div class="camera-card">
        <div class="camera-preview">
          <video>
            <mai-spinner></mai-spinner>
          </video>
          <mai-badge appearance="onImage">
            <svg slot="start">
              <use href="img/edge/icons.svg#video-16-filled" />
            </svg>
            Preview
          </mai-badge>
        </div>
        <mai-dropdown>
          <mai-listbox>
            ${repeat(
              (x) => x.cams,
              html`<mai-option
                selected="${(x, c) => x.deviceId === c.parent.cams[0].deviceId}"
              >
                ${(x, c) => x.label || `Camera ${c.index + 1}`}
              </mai-option>`,
            )}
          </mai-listbox>
        </mai-dropdown>
      </div>
    </div>
  </div>
  <div part="footer">
    <mai-button @click="${(x) => x.allowWhileVisiting()}">
      Allow while visiting this site
    </mai-button>
    <mai-button @click="${(x) => x.allowThisTime()}">
      Allow this time
    </mai-button>
    <mai-button @click="${(x) => x.neverAllow()}"> Never allow </mai-button>
  </div>
`;

const styles = css`
  :host {
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXSmall};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyoutAmbient}, ${shadowFlyoutKey};
    border: ${strokeWidthCardDefault} solid ${strokeFlyout};
    overflow: hidden;
    padding: ${ctrlDialogPadding};
  }

  [part='header'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: ${textStyleDefaultHeaderWeight};
  }

  [part='body'] {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXSmall};

    #message {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${gapBetweenContentXSmall};

      svg {
        width: 20px;
        height: 20px;
      }
    }

    #card-container {
      display: flex;
      flex-direction: column;
      gap: ${gapBetweenContentXSmall};
      background: ${backgroundLayerTertiary};
      padding: ${paddingContentXSmall};

      .camera-card {
        display: flex;
        flex-direction: column;
        gap: ${gapBetweenContentXSmall};
        border: ${strokeWidthCardDefault} solid ${strokeCardOnPrimaryRest};
        border-radius: ${cornerCardDefault};
        padding: ${paddingCardDefault};
        background: ${backgroundCardOnPrimaryDefaultRest};

        mai-dropdown {
          button {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .camera-preview {
          position: relative;
          overflow: hidden;
          border-radius: ${cornerCtrlRest};
          line-height: 0;

          video {
            width: 100%;
            height: auto;
          }

          #smoke {
            position: absolute;
            inset: 0;
            background: ${backgroundSmoke};
          }

          mai-badge {
            position: absolute;
            top: ${gapBetweenContentXSmall};
            right: ${gapBetweenContentXSmall};
          }
        }
      }
    }
  }

  [part='footer'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: ${gapBetweenContentXSmall};
    margin-top: ${gapBetweenContentXSmall};

    mai-button {
      width: 100%;
    }
  }
`;

@customElement({ name: 'camera-permission-prompt', template, styles })
export default class CameraPermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable cams: Array<MediaDeviceInfo> = [];
  @observable selectedCamId?: string;
  _vid?: HTMLVideoElement;

  openChanged() {
    if (this.open) {
      this.updateCameraList();
      this.openCameraFeed();
    } else {
      this.closeCameraFeed();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
  }

  setElements() {
    this._vid = this.shadowRoot!.querySelector('video')!;
  }

  addEventListeners() {
    this.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  updateCameraList() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      this.cams = devices.filter((device) => device.kind === 'videoinput');
      if (this.cams.length > 0) {
        this.selectedCamId = this.cams[0].deviceId;
      }
    });
  }

  openCameraFeed() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (!this._vid) return;
        this._vid.srcObject = stream;
        this._vid.play();
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  }

  closeCameraFeed() {
    if (!this._vid) return;

    this._vid.pause();
    const stream = this._vid.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }

  allowWhileVisiting() {
    this.ps.grantCameraAccess(true);
  }

  allowThisTime() {
    this.ps.grantCameraAccess(false);
  }

  neverAllow() {
    this.ps.denyCameraAccess();
    this.closeCameraFeed();
  }
}
