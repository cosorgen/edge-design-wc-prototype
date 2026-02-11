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
  backgroundLayerTertiary,
  paddingContentXSmall,
  foregroundCtrlNeutralPrimaryRest,
} from '@mai-ui/design-tokens/tokens.js';
import {
  ctrlDialogPadding,
  strokeWidthCardDefault,
} from '@mai-ui/design-tokens/mai-tokens.js';
import '@mai-ui/button/define.js';

const template = html<MediaPrompt>`
  <div part="header">
    <div id="title">
      <slot name="title">x wants to</slot>
    </div>
    <div id="actions">
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
  </div>
  <div part="body">
    <div id="message">
      <slot>Permission message goes here</slot>
    </div>
    <slot name="cards">Media cards go here</slot>
  </div>
  <div part="footer">
    <mai-button @click="${(x) => x.$emit('allow')}">
      Allow while visiting this site
    </mai-button>
    <mai-button @click="${(x) => x.$emit('allowOnce')}">
      Allow this time
    </mai-button>
    <mai-button @click="${(x) => x.$emit('block')}"> Never allow </mai-button>
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

    #actions {
      height: stretch;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
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

    [name='cards'] {
      display: none;
      flex-direction: column;
      gap: ${gapBetweenContentXSmall};
      background: ${backgroundLayerTertiary};
      padding: ${paddingContentXSmall};
      border-radius: ${cornerFlyoutRest};
    }
  }

  :host([has-cards]) [name='cards'] {
    display: flex;
  }

  [part='footer'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: ${gapBetweenContentXSmall};
    margin-top: ${gapBetweenContentXSmall};

    mai-button {
      width: 100%;
    }
  }
`;

@customElement({ name: 'media-prompt', template, styles })
export default class MediaPrompt extends FASTElement {
  @attr({ attribute: 'has-cards', mode: 'boolean' }) hasCards = false;
}
