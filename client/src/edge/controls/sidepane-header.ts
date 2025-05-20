import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import {
  backgroundToolbar,
  cornerLayerDefault,
  gapBetweenCtrlDefault,
  strokeCtrlOnoutlineRest,
  strokewidthDefault,
  textGlobalBody3Fontsize,
  textGlobalBody3Lineheight,
  textStyleDefaultHeaderWeight,
  textStyleDefaultRegularFontfamily,
} from '@phoenixui/themes/smtc-tokens.js';

const template = html` <div id="title"><slot></slot></div>
  <div id="actions">
    <mai-button size="small" appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#more-vertical-16-regular" />
      </svg>
    </mai-button>
    <mai-button size="small" appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#arrow-clockwise-16-regular" />
      </svg>
    </mai-button>
    <mai-button
      size="small"
      appearance="subtle"
      @click="${(x) => x.$emit('close')}"
      icon-only
    >
      <svg>
        <use href="img/edge/icons.svg#dismiss-16-regular" />
      </svg>
    </mai-button>
  </div>`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenCtrlDefault};
    background: ${backgroundToolbar};
    background-blend-mode: luminosity;
    padding: calc(4px + var(--smtc-padding-window-default));
    padding-inline-start: calc(8px + var(--smtc-padding-window-default));
    border-bottom: ${strokewidthDefault} solid ${strokeCtrlOnoutlineRest};
    border-radius: ${cornerLayerDefault} ${cornerLayerDefault} 0 0;
  }

  #title {
    flex: 1;

    font-family: ${textStyleDefaultRegularFontfamily};
    font-size: ${textGlobalBody3Fontsize};
    font-weight: ${textStyleDefaultHeaderWeight};
    line-height: ${textGlobalBody3Lineheight};
  }
`;

@customElement({ name: 'sidepane-header', template, styles })
export class SidepaneHeader extends FASTElement {}
