import {
  css,
  customElement,
  FASTElement,
  html,
  observable,
  repeat,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerFlyout,
  colorNeutralForeground1,
  shadow28,
  spacingHorizontalMNudge,
  spacingHorizontalS,
  spacingHorizontalXS,
  typographyStyles,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/divider.js';
import '../controls/extension-hub-item.js';
import '../controls/menu-item.js';

const template = html<ExtensionsHub>` <div id="header">
    <span>Extensions</span>
    <phx-button size="small" appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#more-horizontal-20-regular" />
      </svg>
    </phx-button>
  </div>
  <phx-divider appearance="strong"></phx-divider>
  <div id="content">
    ${repeat(
      (x) => x.extensions,
      html`<extension-hub-item>
        <img
          slot="start"
          src="/img/edge/${(x) => x.toLowerCase()}AppLight.png"
          alt="Search icon"
        />
        ${(x) => x}
      </extension-hub-item>`,
    )}
    <phx-divider></phx-divider>
    <menu-item start-slot>
      <svg slot="start">
        <use href="/img/edge/icons.svg#puzzle-piece-20-regular" />
      </svg>
      Manage extensions
    </menu-item>
    <menu-item start-slot>
      <svg slot="start">
        <use href="/img/edge/icons.svg#store-microsoft-20-regular" />
      </svg>
      More extensions from Microsoft
    </menu-item>
  </div>`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    width: fit-content;
    min-width: 128px;
    min-height: 16px;
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
    overflow: hidden;
    color: ${colorNeutralForeground1};
  }

  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${spacingHorizontalS};
    padding-inline-start: ${spacingHorizontalMNudge};

    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: ${typographyStyles.body1Strong.lineHeight};
  }

  #content {
    display: flex;
    flex-direction: column;
    padding: ${spacingHorizontalXS};

    phx-divider {
      margin: ${spacingHorizontalXS} 0;
    }
  }
`;

@customElement({
  name: 'extensions-hub',
  template,
  styles,
})
export class ExtensionsHub extends FASTElement {
  @observable extensions = ['Search', 'Grammarly', 'AdBlocker', 'Tools'];
}
