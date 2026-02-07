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

const labels: Record<string, string> = {
  camera: 'Use camera?',
  microphone: 'Use microphone?',
};

const iconIds: Record<string, string> = {
  camera: 'video-20-regular',
  microphone: 'mic-20-regular',
};

const prompts: Record<string, ViewTemplate> = {
  camera: html`<camera-permission-prompt></camera-permission-prompt>`,
  microphone: html`<microphone-permission-prompt></microphone-permission-prompt>`,
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
`;

@customElement({ name: 'permission-prompt', template, styles })
export class PermissionPrompt extends FASTElement {
  @attr type: 'camera' | 'microphone' = 'camera';
}
