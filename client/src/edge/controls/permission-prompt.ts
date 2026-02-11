import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  when,
  ViewTemplate,
} from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import '@mai-ui/divider/define.js';
import {
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtlePressed,
  backgroundCtrlSubtleRest,
  backgroundCtrlSubtleSelectedHover,
  backgroundCtrlSubtleSelectedPressed,
  backgroundCtrlSubtleSelectedRest,
  cornerCircular,
  curveDecelerateMax,
  durationSlow,
  foregroundCtrlNeutralSecondaryHover,
  foregroundCtrlNeutralSecondaryPressed,
  foregroundCtrlNeutralSecondaryRest,
  gapBetweenContentXSmall,
  paddingContentSmall,
  paddingContentXSmall,
  paddingCtrlSmHorizontalIconOnly,
} from '@mai-ui/design-tokens/tokens.js';
import {
  ctrlOmniboxActionBubbleBackgroundHover,
  ctrlOmniboxActionBubbleBackgroundPressed,
  ctrlOmniboxActionBubbleBackgroundRest,
  ctrlOmniboxActionBubbleForegroundHover,
  ctrlOmniboxActionBubbleForegroundPressed,
  ctrlOmniboxActionBubbleForegroundRest,
} from '@mai-ui/design-tokens/edge-tokens.js';
import './flyout-menu.js';
import '../views/camera-permission-prompt.js';
import '../views/microphone-permission-prompt.js';
import '../views/usb-permission-prompt.js';
import '../views/bluetooth-permission-prompt.js';
import '../views/serial-permission-prompt.js';
import '../views/location-permission-prompt.js';
import '../views/download-permission-prompt.js';
import '../views/midi-permission-prompt.js';
import '../views/clipboard-permission-prompt.js';
import '../views/notification-permission-prompt.js';

const labels: Record<string, string> = {
  camera: 'Use camera?',
  microphone: 'Use microphone?',
  usb: '',
  bluetooth: '',
  serial: '',
  location: 'Use your location?',
  download: '',
  midi: 'Control & reprogram MIDI devices?',
  clipboard: 'Share clipboard?',
  notification: 'Get notifications?',
};

const iconIds: Record<string, string> = {
  camera: 'video-20-regular',
  microphone: 'mic-20-regular',
  usb: 'lock-closed-20-regular',
  bluetooth: 'lock-closed-20-regular',
  serial: 'lock-closed-20-regular',
  location: 'location-20-regular',
  download: 'lock-closed-20-regular',
  midi: 'midi-20-regular',
  clipboard: 'clipboard-20-regular',
  notification: 'alert-20-regular',
};

const prompts: Record<string, ViewTemplate> = {
  camera: html`<camera-permission-prompt></camera-permission-prompt>`,
  microphone: html`<microphone-permission-prompt></microphone-permission-prompt>`,
  usb: html`<usb-permission-prompt></usb-permission-prompt>`,
  bluetooth: html`<bluetooth-permission-prompt></bluetooth-permission-prompt>`,
  serial: html`<serial-permission-prompt></serial-permission-prompt>`,
  location: html`<location-permission-prompt></location-permission-prompt>`,
  download: html`<download-permission-prompt></download-permission-prompt>`,
  midi: html`<midi-permission-prompt></midi-permission-prompt>`,
  clipboard: html`<clipboard-permission-prompt></clipboard-permission-prompt>`,
  notification: html`<notification-permission-prompt></notification-permission-prompt>`,
};

const template = html<PermissionPrompt>`
  <flyout-menu initially-open>
    <button slot="trigger">
      <svg slot="${(x) => (labels[x.type] ? 'start' : undefined)}">
        <use href="img/edge/icons.svg#${(x) => iconIds[x.type]}" />
      </svg>
      ${when(
        (x) => labels[x.type],
        html` <div part="label">${(x) => labels[x.type]}</div> `,
      )}
    </button>
    ${(x) => prompts[x.type]}
  </flyout-menu>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${gapBetweenContentXSmall};
    background: ${ctrlOmniboxActionBubbleBackgroundRest};
    border: none;
    padding: ${paddingCtrlSmHorizontalIconOnly} ${paddingContentSmall}
      ${paddingCtrlSmHorizontalIconOnly} ${paddingContentXSmall};
    margin: 0;
    color: ${ctrlOmniboxActionBubbleForegroundRest};
    border-radius: ${cornerCircular};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  button:hover,
  button[aria-pressed='true']:hover {
    background: ${ctrlOmniboxActionBubbleBackgroundHover};
    color: ${ctrlOmniboxActionBubbleForegroundHover};
    cursor: pointer;
  }

  button:hover:active,
  button[aria-pressed='true'] {
    background: ${ctrlOmniboxActionBubbleBackgroundPressed};
    color: ${ctrlOmniboxActionBubbleForegroundPressed};
  }

  :host([ignore]) button {
    background: ${backgroundCtrlSubtleRest};
    color: ${foregroundCtrlNeutralSecondaryRest};
  }

  :host([ignore]) button:hover {
    background: ${backgroundCtrlSubtleHover};
    color: ${foregroundCtrlNeutralSecondaryHover};
  }

  :host([ignore]) button:hover:active {
    background: ${backgroundCtrlSubtlePressed};
    color: ${foregroundCtrlNeutralSecondaryPressed};
  }

  :host([ignore]) button[aria-pressed='true'] {
    background: ${backgroundCtrlSubtleSelectedRest};
    color: ${foregroundCtrlNeutralSecondaryRest};
  }

  :host([ignore]) button[aria-pressed='true']:hover {
    background: ${backgroundCtrlSubtleSelectedHover};
    color: ${foregroundCtrlNeutralSecondaryHover};
  }

  :host([ignore]) button[aria-pressed='true']:hover:active {
    background: ${backgroundCtrlSubtleSelectedPressed};
    color: ${foregroundCtrlNeutralSecondaryPressed};
  }

  svg,
  img {
    width: 20px;
    height: 20px;
  }

  [part='label'] {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    min-width: 0px;

    /* Animation on load */
    width: 0px;
    transition: all ${durationSlow} ${curveDecelerateMax};
  }

  :host([aria-expanded='true']) [part='label'] {
    width: var(--max-label-width);
  }

  :host([ignore]) [part='label'] {
    display: none;
  }

  :host([ignore]) button {
    padding: ${paddingCtrlSmHorizontalIconOnly};
    gap: 0px;
  }
`;

@customElement({ name: 'permission-prompt', template, styles })
export class PermissionPrompt extends FASTElement {
  @attr({ attribute: 'aria-expanded' }) ariaExpanded = 'false';
  @attr type:
    | 'camera'
    | 'microphone'
    | 'usb'
    | 'bluetooth'
    | 'serial'
    | 'location'
    | 'download'
    | 'midi'
    | 'clipboard'
    | 'notification' = 'camera';
  @attr({ mode: 'boolean' }) ignore = false;

  connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => {
      this.setLabelWidth();
      this.ariaExpanded = 'true';
    }, 100);
  }

  typeChanged() {
    this.ariaExpanded = 'false';
    setTimeout(() => {
      this.setLabelWidth();
      this.ariaExpanded = 'true';
    }, 100);
  }

  private setLabelWidth() {
    this.setAttribute(
      'style',
      '--max-label-width: ' +
        this.shadowRoot?.querySelector('div')?.scrollWidth +
        'px',
    );
  }
}
