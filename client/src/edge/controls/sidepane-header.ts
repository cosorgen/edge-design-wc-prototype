import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerBase,
  colorNeutralStroke2,
  spacingHorizontalS,
  strokeWidthThin,
  typographyStyles,
  spacingFrame,
} from '@mai-ui/phoenix-theme';
import '@phoenixui/web-components/button.js';

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
    gap: ${spacingHorizontalS};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    padding: calc(4px + ${spacingFrame});
    padding-inline-start: calc(8px + ${spacingFrame});
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStroke2};
    border-radius: ${borderRadiusLayerBase} ${borderRadiusLayerBase} 0 0;
  }

  #title {
    flex: 1;

    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: ${typographyStyles.body1Strong.lineHeight};
  }
`;

@customElement({
  name: 'sidepane-header',
  template,
  styles,
})
export class SidepaneHeader extends FASTElement {}
