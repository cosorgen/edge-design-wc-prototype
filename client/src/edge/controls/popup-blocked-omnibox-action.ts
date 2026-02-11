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

const template = html<PopupBlockedOmniboxAction>`
  <button>
    <svg>
      <use href="img/edge/icons.svg#window-header-horizontal-off-20-regular" />
    </svg>
    <div part="label">Popup Blocked</div>
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
    background: ${backgroundCtrlSubtleRest};
    color: ${foregroundCtrlNeutralSecondaryRest};
    border: none;
    padding: ${paddingCtrlSmHorizontalIconOnly} ${paddingContentSmall}
      ${paddingCtrlSmHorizontalIconOnly} ${paddingContentXSmall};
    margin: 0;
    border-radius: ${cornerCircular};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  button:hover {
    background: ${backgroundCtrlSubtleHover};
    color: ${foregroundCtrlNeutralSecondaryHover};
  }

  button:hover:active {
    background: ${backgroundCtrlSubtlePressed};
    color: ${foregroundCtrlNeutralSecondaryPressed};
  }

  :host([aria-pressed='true']) button {
    background: ${backgroundCtrlSubtleSelectedRest};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  :host([aria-pressed='true']) button:hover {
    background: ${backgroundCtrlSubtleSelectedHover};
    color: ${foregroundCtrlNeutralPrimaryHover};
  }

  :host([aria-pressed='true']) button:hover:active {
    background: ${backgroundCtrlSubtleSelectedPressed};
    color: ${foregroundCtrlNeutralPrimaryPressed};
  }

  svg,
  img {
    width: 20px;
    height: 20px;
  }

  [part='label'] {
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

  :host([aria-expanded='false']) button {
    padding: ${paddingCtrlSmHorizontalIconOnly};
    gap: 0px;
  }
`;

@customElement({ name: 'popup-blocked-omnibox-action', template, styles })
export class PopupBlockedOmniboxAction extends FASTElement {
  @attr({ attribute: 'aria-expanded' }) ariaExpanded = 'false';

  connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => {
      this.setLabelWidth();
      this.ariaExpanded = 'true';
      this.setClose();
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

  setClose() {
    setTimeout(() => {
      this.ariaExpanded = 'false';
    }, 3000);
  }
}
