import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  when,
} from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import '@mai-ui/divider/define.js';
import {
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtleRest,
  cornerCircular,
  foregroundCtrlNeutralSecondaryRest,
  paddingCtrlSmHorizontalIconOnly,
} from '@mai-ui/design-tokens/tokens.js';
import './flyout-menu.js';

const labels: Record<string, string> = {
  camera: 'Use camera?',
};

const iconIds: Record<string, string> = {
  camera: 'video-20-regular',
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
    <more-menu></more-menu>
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
    background: ${backgroundCtrlSubtleRest};
    border: none;
    padding: ${paddingCtrlSmHorizontalIconOnly};
    margin: 0;
    color: ${foregroundCtrlNeutralSecondaryRest};
    border-radius: ${cornerCircular};
  }

  button:hover {
    background: ${backgroundCtrlSubtleHover};
    cursor: pointer;
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
