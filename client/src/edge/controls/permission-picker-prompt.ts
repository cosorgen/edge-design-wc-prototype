import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
} from '@microsoft/fast-element';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  shadowFlyoutKey,
  shadowFlyoutAmbient,
  strokeFlyout,
  textStyleDefaultHeaderWeight,
  gapBetweenContentXSmall,
  foregroundCtrlNeutralPrimaryRest,
  strokeCtrlOnOutlineRest,
  strokeWidthDefault,
  cornerCtrlRest,
} from '@mai-ui/design-tokens/tokens.js';
import {
  ctrlDialogPadding,
  strokeWidthCardDefault,
} from '@mai-ui/design-tokens/mai-tokens.js';
import '@mai-ui/button/define.js';

const template = html<PermissionPickerPrompt>`
  <div part="header">
    <div id="title">
      <slot name="title">x wants to</slot>
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
    <div id="container">
      <slot></slot>
    </div>
  </div>
  <div part="footer">
    <mai-button
      appearance="subtle"
      @click="${(x) => x.$emit('help')}"
      icon-only
    >
      <svg>
        <use href="img/edge/icons.svg#question-circle-20-regular" />
      </svg>
    </mai-button>
    <div>
      <mai-button
        @click="${(x) => x.$emit('connect', { device: '' })}"
        ?disabled="${(x) => !x.enableConnect}"
      >
        Connect
      </mai-button>
      <mai-button @click="${(x) => x.$emit('closemenu')}"> Cancel </mai-button>
    </div>
  </div>
`;

const styles = css`
  :host {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXSmall};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyoutAmbient}, ${shadowFlyoutKey};
    border: ${strokeWidthCardDefault} solid ${strokeFlyout};
    overflow: hidden;
    padding: ${ctrlDialogPadding};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  [part='header'] {
    display: flex;
    flex-direction: row;
    align-items: center;

    #title {
      flex: 1;
      font-weight: ${textStyleDefaultHeaderWeight};
      text-wrap: pretty;
    }
  }

  [part='body'] {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXSmall};

    #container {
      display: flex;
      flex-direction: column;
      gap: ${gapBetweenContentXSmall};
      border: ${strokeWidthDefault} solid ${strokeCtrlOnOutlineRest};
      border-radius: ${cornerCtrlRest};
      height: 320px;
    }
  }

  [part='footer'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${gapBetweenContentXSmall};
    margin-top: ${gapBetweenContentXSmall};

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${gapBetweenContentXSmall};
    }
  }
`;

@customElement({ name: 'permission-picker-prompt', template, styles })
export default class PermissionPickerPrompt extends FASTElement {
  @attr({ mode: 'boolean', attribute: 'enable-connect' }) enableConnect = false;
}
