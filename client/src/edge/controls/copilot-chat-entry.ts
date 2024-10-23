import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import {
  borderRadiusLarge,
  colorNeutralCardBackground,
  colorNeutralForeground1,
  colorNeutralForegroundHint,
  curveDecelerateMax,
  durationNormal,
  durationUltraSlow,
  spacingHorizontalL,
  spacingHorizontalXS,
  spacingVerticalM,
  spacingVerticalMNudge,
  spacingVerticalXXS,
  typographyStyles,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/spinner.js';
import { colorLoadingSpinner } from '../copilotDesignSystem.js';

const template = html`<div id="message">
    <slot></slot>
  </div>
  <div id="actions">
    <span id="timestamp">${(x) => x.time}</span>
    <phx-button size="small" appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#thumb-like-20-regular"></use>
      </svg>
    </phx-button>
    <phx-button size="small" appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#thumb-dislike-20-regular"></use>
      </svg>
    </phx-button>
  </div>
  <div id="loading"></div>`;

const styles = css`
  :host {
    --text-transition-duration: 2s;

    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalXXS};
    align-items: center;
  }

  #message {
    display: flex;
    flex-direction: column;

    font-family: ${typographyStyles.body2.fontFamily};
    font-size: ${typographyStyles.body2.fontSize};
    line-height: ${typographyStyles.body2.lineHeight};
    font-weight: ${typographyStyles.body2.fontWeight};
    color: ${colorNeutralForeground1};
  }

  :host(:not([system])) #message {
    padding: ${spacingVerticalMNudge} ${spacingHorizontalL};
    border-radius: ${borderRadiusLarge};
    background: ${colorNeutralCardBackground};
    align-self: flex-end;
    text-align: end;
    max-width: 80%;

    transform: translateY(0px);
    opacity: 1;
    transition:
      transform ${durationUltraSlow} ${curveDecelerateMax},
      opacity ${durationUltraSlow} ${curveDecelerateMax};
  }

  :host([system]) #message {
    background: transparent;
    align-self: flex-start;
    padding: 0;
    text-align: start;

    mask: linear-gradient(165deg, black, black 50%, transparent 75%);
    mask-position: 200% 200%;
    mask-size: 200% 200%;
    mask-repeat: no-repeat;
    transition: mask-position var(--text-transition-duration);
  }

  :host([system]:not([pending])) #message {
    mask-position: 0 0;
  }

  #actions {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalXS};
    align-items: center;

    font-family: ${typographyStyles.caption1.fontFamily};
    font-size: ${typographyStyles.caption1.fontSize};
    line-height: ${typographyStyles.caption1.lineHeight};
    font-weight: ${typographyStyles.caption1.fontWeight};
    color: ${colorNeutralForegroundHint};

    opacity: 0;
    transition: opacity ${durationNormal};

    phx-button {
      color: ${colorNeutralForegroundHint};
    }
  }

  :host(:hover:is([system]):not([pending])) #actions {
    opacity: 1;
  }

  :host([pending]) #message {
    transform: translateY(24px);
    opacity: 0;
  }

  #loading {
    display: none;
    width: 64px;
    height: 64px;
    background-color: ${colorLoadingSpinner};
    mask: url(img/edge/copilotLoading.gif);
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: center;
    margin-block-end: ${spacingVerticalM};

    opacity: 1;
    transition: opacity ${durationUltraSlow} ${curveDecelerateMax} 250ms;
  }

  :host([pending]) #loading {
    display: block;
  }

  :host([pending]) #actions {
    display: none;
  }

  @starting-style {
    :host([system]:not([pending])) #message {
      mask-position: 200% 200%;
    }

    :host(:not([system])) #message {
      transform: translateY(40px);
      opacity: 0;
    }

    #loading {
      opacity: 0;
    }
  }
`;

@customElement({ name: 'copilot-chat-entry', template, styles })
export class CopilotChatEntry extends FASTElement {
  @attr({ mode: 'boolean' }) system = false;
  @attr({ mode: 'boolean' }) inline = false;
  @attr({ mode: 'boolean' }) pending = false;
  @attr time = '';
}
