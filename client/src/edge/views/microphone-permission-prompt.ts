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
  strokeCardOnPrimaryRest,
  backgroundLayerTertiary,
  paddingContentXSmall,
  backgroundCardOnPrimaryDefaultRest,
  ctrlProgressBackgroundEmpty,
  ctrlProgressCorner,
  ctrlProgressBackgroundFilled,
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
import '@mai-ui/dropdown/define.js';
import '@mai-ui/option/define.js';
import '@mai-ui/listbox/define.js';
import EdgePermissionsService from '#servicespermissionsService.js';

const template = html<MicrophonePermissionPrompt>`
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
        <use href="img/edge/icons.svg#mic-20-regular" />
      </svg>
      Use available microphones (${(x) => x.mics.length})
    </div>
    <div id="card-container">
      <div id="microphone-card">
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

      #microphone-card {
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

@customElement({ name: 'microphone-permission-prompt', template, styles })
export default class MicrophonePermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable mics: Array<MediaDeviceInfo> = [];
  @observable selectedMicId?: string;
  @observable micLevel: string = '0%';
  _aud?: HTMLAudioElement;

  openChanged() {
    if (this.open) {
      this.updateMicList();
      this.openMicFeed();
    } else {
      this.closeMicFeed();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
  }

  setElements() {
    this._aud = this.shadowRoot!.querySelector('audio')!;
  }

  addEventListeners() {
    this.addEventListener('click', (e) => {
      e.stopPropagation();
    });
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

          if (this.open) {
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

    this._aud.pause();
    const stream = this._aud.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }

  allowWhileVisiting() {
    this.ps.grantMicrophoneAccess(true);
  }

  allowThisTime() {
    this.ps.grantMicrophoneAccess(false);
  }

  neverAllow() {
    this.ps.denyMicrophoneAccess();
    this.closeMicFeed();
  }
}
