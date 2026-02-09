import { FASTElement, customElement, css, html } from '@microsoft/fast-element';
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
    <div id="card-container">
      <slot name="cards">Media cards go here</slot>
    </div>
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
    align-items: start;

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

    #card-container {
      display: flex;
      flex-direction: column;
      gap: ${gapBetweenContentXSmall};
      background: ${backgroundLayerTertiary};
      padding: ${paddingContentXSmall};
    }
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
export default class MediaPrompt extends FASTElement {}
