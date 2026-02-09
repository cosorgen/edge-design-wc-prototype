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
  strokeCardOnPrimaryRest,
  backgroundCardOnPrimaryDefaultRest,
  ctrlProgressBackgroundEmpty,
  ctrlProgressCorner,
  ctrlProgressBackgroundFilled,
} from '@mai-ui/design-tokens/tokens.js';
import {
  cornerCardDefault,
  paddingCardDefault,
  strokeWidthCardDefault,
} from '@mai-ui/design-tokens/mai-tokens.js';
import '@mai-ui/dropdown/define.js';
import '@mai-ui/option/define.js';
import '@mai-ui/listbox/define.js';

const template = html<MicrophonePermissionCard>`
  <div id="microphone-preview">
    <audio autoplay muted></audio>
    <svg>
      <use href="img/edge/icons.svg#mic-20-regular" />
    </svg>
    <div id="level-control">
      <div id="level"></div>
    </div>
  </div>
  <mai-dropdown>
    <mai-listbox>
      ${repeat(
        (x) => x.mics,
        html`<mai-option
          selected="${(x, c) => x.deviceId === c.parent.mics[0].deviceId}"
        >
          ${(x, c) => x.label || `Microphone ${c.index + 1}`}
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

  #microphone-preview {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXSmall};

    svg {
      width: 20px;
      height: 20px;
    }

    #level-control {
      flex: 1;
      position: relative;
      background: ${ctrlProgressBackgroundEmpty};
      border-radius: ${ctrlProgressCorner};
      height: 8px;
      overflow: hidden;

      #level {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        background: ${ctrlProgressBackgroundFilled};
        border-radius: ${ctrlProgressCorner};
        width: ${(x) => x.micLevel};
        transition: width 150ms linear;
      }
    }
  }
`;

@customElement({ name: 'microphone-permission-card', template, styles })
export default class MicrophonePermissionCard extends FASTElement {
  @observable mics: Array<MediaDeviceInfo> = [];
  @observable selectedMicId?: string;
  @observable micLevel: string = '0%';
  _aud?: HTMLAudioElement;
  active: boolean = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
  }

  setElements() {
    this._aud = this.shadowRoot!.querySelector('audio')!;
  }

  updateMicList() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      this.mics = devices.filter((device) => device.kind === 'audioinput');
      if (this.mics.length > 0) {
        this.selectedMicId = this.mics[0].deviceId;
      }
    });
  }

  openMicFeed() {
    this.active = true;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (!this._aud) return;
        this._aud.srcObject = stream;
        this._aud.play();

        // Create audio context and analyser
        const audioContext = new window.AudioContext();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateLevel = () => {
          analyser.getByteTimeDomainData(dataArray);

          // Calculate RMS (Root Mean Square) volume
          let sumSquares = 0;
          for (let i = 0; i < dataArray.length; i++) {
            const normalized = (dataArray[i] - 128) / 128; // -1 to 1
            sumSquares += normalized * normalized;
          }
          const rms = Math.sqrt(sumSquares / dataArray.length);
          const levelPercent = Math.min(100, rms * 200); // scale to 0–100%

          // Update UI
          this.micLevel = `${levelPercent}%`;

          if (this.active) {
            requestAnimationFrame(updateLevel);
          }
        };

        updateLevel();
      })
      .catch((err) => {
        console.error('Error accessing microphone:', err);
      });
  }

  closeMicFeed() {
    if (!this._aud) return;

    this.active = false;
    this._aud.pause();
    const stream = this._aud.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }
}
