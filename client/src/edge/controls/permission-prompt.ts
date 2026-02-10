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
  cornerCircular,
  curveDecelerateMax,
  durationSlow,
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

const labels: Record<string, string> = {
  camera: 'Use camera?',
  microphone: 'Use microphone?',
  usb: 'Connect USB device?',
  bluetooth: 'Connect Bluetooth device?',
  serial: 'Connect Serial device?',
};

const iconIds: Record<string, string> = {
  camera: 'video-20-regular',
  microphone: 'mic-20-regular',
  usb: 'placeholder-20-regular',
  bluetooth: 'bluetooth-20-regular',
  serial: 'serial-port-20-regular',
};

const prompts: Record<string, ViewTemplate> = {
  camera: html`<camera-permission-prompt></camera-permission-prompt>`,
  microphone: html`<microphone-permission-prompt></microphone-permission-prompt>`,
  usb: html`<usb-permission-prompt></usb-permission-prompt>`,
  bluetooth: html`<bluetooth-permission-prompt></bluetooth-permission-prompt>`,
  serial: html`<serial-permission-prompt></serial-permission-prompt>`,
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
`;

@customElement({ name: 'permission-prompt', template, styles })
export class PermissionPrompt extends FASTElement {
  @attr({ attribute: 'aria-expanded' }) ariaExpanded = 'false';
  @attr type: 'camera' | 'microphone' | 'usb' = 'camera';
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
