import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
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
  foregroundCtrlNeutralPrimaryHover,
  foregroundCtrlNeutralPrimaryPressed,
  foregroundCtrlNeutralPrimaryRest,
  foregroundCtrlNeutralSecondaryHover,
  foregroundCtrlNeutralSecondaryPressed,
  foregroundCtrlNeutralSecondaryRest,
  gapBetweenContentXSmall,
  paddingContentSmall,
  paddingContentXSmall,
  paddingCtrlSmHorizontalIconOnly,
} from '@mai-ui/design-tokens/tokens.js';
import './flyout-menu.js';
import '../views/camera-permission-prompt.js';
import {
  ctrlOmniboxActionBubbleBackgroundHover,
  ctrlOmniboxActionBubbleBackgroundPressed,
  ctrlOmniboxActionBubbleBackgroundRest,
  ctrlOmniboxActionBubbleForegroundHover,
  ctrlOmniboxActionBubbleForegroundPressed,
  ctrlOmniboxActionBubbleForegroundRest,
} from '@mai-ui/design-tokens/edge-tokens.js';

const iconIds: Record<string, Record<string, string>> = {
  camera: {
    allow: 'video-20-regular',
    ask: 'video-20-regular',
    block: 'video-off-20-regular',
  },
  microphone: {
    allow: 'mic-20-regular',
    ask: 'mic-20-regular',
    block: 'mic-off-20-regular',
  },
};

const labels: Record<string, Record<string, string>> = {
  camera: {
    allow: 'Camera in use',
    ask: 'Camera in use',
    block: 'Camera not allowed',
  },
  microphone: {
    allow: 'Microphone in use',
    ask: 'Microphone in use',
    block: 'Microphone not allowed',
  },
};

const template = html<PermissionStatus>`
  <button>
    <svg>
      <use href="img/edge/icons.svg#${(x) => iconIds[x.type][x.permission]}" />
    </svg>
    <div part="label">${(x) => labels[x.type][x.permission]}</div>
  </button>
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
  :host([aria-pressed='true']) button:hover {
    background: ${ctrlOmniboxActionBubbleBackgroundHover};
    color: ${ctrlOmniboxActionBubbleForegroundHover};
    cursor: pointer;
  }

  button:hover:active,
  :host([aria-pressed='true']) button {
    background: ${ctrlOmniboxActionBubbleBackgroundPressed};
    color: ${ctrlOmniboxActionBubbleForegroundPressed};
  }

  :host([permission='block']) button {
    background: ${backgroundCtrlSubtleRest};
    color: ${foregroundCtrlNeutralSecondaryRest};
  }

  :host([permission='block']) button:hover {
    background: ${backgroundCtrlSubtleHover};
    color: ${foregroundCtrlNeutralSecondaryHover};
  }

  :host([permission='block']) button:hover:active {
    background: ${backgroundCtrlSubtlePressed};
    color: ${foregroundCtrlNeutralSecondaryPressed};
  }

  :host([permission='block'][aria-pressed='true']) button {
    background: ${backgroundCtrlSubtleSelectedRest};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  :host([permission='block'][aria-pressed='true']) button:hover {
    background: ${backgroundCtrlSubtleSelectedHover};
    color: ${foregroundCtrlNeutralPrimaryHover};
  }

  :host([permission='block'][aria-pressed='true']) button:hover:active {
    background: ${backgroundCtrlSubtleSelectedPressed};
    color: ${foregroundCtrlNeutralPrimaryPressed};
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

@customElement({ name: 'permission-status', template, styles })
export class PermissionStatus extends FASTElement {
  @attr({ attribute: 'aria-expanded' }) ariaExpanded = 'false';
  @attr type: 'camera' | 'microphone' = 'camera';
  @attr permission: 'allow' | 'block' | 'ask' = 'ask';

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

  permissionChanged() {
    this.ariaExpanded = 'false';
    setTimeout(() => {
      this.setLabelWidth();
      this.ariaExpanded = 'true';
    }, 100);
  }

  setLabelWidth(width?: string) {
    this.setAttribute(
      'style',
      '--max-label-width: ' +
        (width ??
          this.shadowRoot?.querySelector('[part="label"]')?.scrollWidth) +
        'px',
    );
  }
}
