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
} from '@mai-ui/design-tokens/tokens.js';
import {
  ctrlDialogPadding,
  strokeWidthCardDefault,
} from '@mai-ui/design-tokens/mai-tokens.js';
import '@mai-ui/button/define.js';

const template = html<PermissionActionPrompt>`
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
    <div id="message">
      <slot>Permission message goes here</slot>
    </div>
    <div id="controls">
      <slot name="controls">Controls go here</slot>
    </div>
  </div>
  <div part="footer">
    <mai-button
      @click="${(x) => {
        x.$emit('manage');
        x.$emit('closemenu');
      }}"
    >
      Manage
    </mai-button>
    <mai-button appearance="primary" @click="${(x) => x.$emit('done')}">
      Done
    </mai-button>
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
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  [part='header'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXSmall};

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

    #message {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${gapBetweenContentXSmall};

      ::slotted(svg) {
        width: 20px;
        height: 20px;
      }
    }
  }

  :host([no-message]) [part='body'] #message {
    display: none;
  }

  [part='footer'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${gapBetweenContentXSmall};
    margin-top: ${gapBetweenContentXSmall};
  }
`;

@customElement({ name: 'permission-action-prompt', template, styles })
export default class PermissionActionPrompt extends FASTElement {
  @attr({ mode: 'boolean', attribute: 'no-message' }) noMessage = false;
}
