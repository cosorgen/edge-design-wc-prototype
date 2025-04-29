import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '@edge-design/button/define.js';
import {
  backgroundToolbar,
  cornerLayerDefault,
  gapBetweenCtrlDefault,
  paddingWindowDefault,
  strokeCtrlOnoutlineRest,
  strokeWidthDefault,
  textGlobalBody3Fontsize,
  textGlobalBody3Lineheight,
  textStyleDefaultHeaderWeight,
  textStyleDefaultRegularFontFamily,
} from '@edge-design/kumo-theme/tokens.js';

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
    padding: calc(4px + ${paddingWindowDefault});
    padding-inline-start: calc(8px + ${paddingWindowDefault});
    border-bottom: ${strokeWidthDefault} solid ${strokeCtrlOnoutlineRest};
    border-radius: ${cornerLayerDefault} ${cornerLayerDefault} 0 0;
  }

  #title {
    flex: 1;

    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3Fontsize};
    font-weight: ${textStyleDefaultHeaderWeight};
    line-height: ${textGlobalBody3Lineheight};
  }
`;

@customElement({ name: 'sidepane-header', template, styles })
export class SidepaneHeader extends FASTElement {}
