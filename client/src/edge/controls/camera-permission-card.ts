import {
  FASTElement,
  customElement,
  css,
  html,
  observable,
  repeat,
} from '@microsoft/fast-element';
import {
  gapBetweenContentXSmall,
  cornerCtrlRest,
  strokeCardOnPrimaryRest,
  backgroundCardOnPrimaryDefaultRest,
} from '@mai-ui/design-tokens/tokens.js';
import {
  cornerCardDefault,
  paddingCardDefault,
  strokeWidthCardDefault,
} from '@mai-ui/design-tokens/mai-tokens.js';
import '@mai-ui/badge/define.js';
import '@mai-ui/dropdown/define.js';
import '@mai-ui/option/define.js';
import '@mai-ui/listbox/define.js';
import '@mai-ui/spinner/define.js';

const template = html<CameraPermissionCard>`
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
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXSmall};
    border: ${strokeWidthCardDefault} solid ${strokeCardOnPrimaryRest};
    border-radius: ${cornerCardDefault};
    padding: ${paddingCardDefault};
    background: ${backgroundCardOnPrimaryDefaultRest};
  }

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

    mai-badge {
      position: absolute;
      top: ${gapBetweenContentXSmall};
      right: ${gapBetweenContentXSmall};
    }
  }
`;

@customElement({ name: 'camera-permission-card', template, styles })
export default class CameraPermissionCard extends FASTElement {
  @observable cams: Array<MediaDeviceInfo> = [];
  @observable selectedCamId?: string;
  _vid?: HTMLVideoElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
  }

  setElements() {
    this._vid = this.shadowRoot!.querySelector('video')!;
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
}
