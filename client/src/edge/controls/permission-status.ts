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
  cornerCircular,
  foregroundCtrlNeutralSecondaryHover,
  foregroundCtrlNeutralSecondaryPressed,
  foregroundCtrlNeutralSecondaryRest,
  gapBetweenContentXSmall,
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

const template = html<PermissionStatus>`
  <button>
    <svg>
      <use href="img/edge/icons.svg#${(x) => iconIds[x.type][x.permission]}" />
    </svg>
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
    padding: ${paddingCtrlSmHorizontalIconOnly};
    margin: 0;
    color: ${ctrlOmniboxActionBubbleForegroundRest};
    border-radius: ${cornerCircular};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  button:hover {
    background: ${ctrlOmniboxActionBubbleBackgroundHover};
    color: ${ctrlOmniboxActionBubbleForegroundHover};
    cursor: pointer;
  }

  button:hover:active,
  button[pressed='true'] {
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

  :host([permission='block']) button:hover:active,
  :host([permission='block']) button[pressed='true'] {
    background: ${backgroundCtrlSubtlePressed};
    color: ${foregroundCtrlNeutralSecondaryPressed};
  }

  svg,
  img {
    width: 20px;
    height: 20px;
  }
`;

@customElement({ name: 'permission-status', template, styles })
export class PermissionStatus extends FASTElement {
  @attr type: 'camera' | 'microphone' = 'camera';
  @attr permission: 'allow' | 'block' | 'ask' = 'ask';
}
