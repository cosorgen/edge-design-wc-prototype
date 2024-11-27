import {
  css,
  customElement,
  FASTElement,
  html,
  observable,
  repeat,
  when,
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
} from '@mai-ui/phoenix-theme';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/divider.js';
import '../controls/extension-hub-item.js';
import '../controls/context-menu.js';
import '../controls/menu-item.js';
import '../controls/flyout-menu.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import apps, { ToolbarApp } from '../installedApps.js';

const template = html<ExtensionsHub>` <div id="header">
    <span>Extensions</span>
    <flyout-menu>
      <mai-button size="small" appearance="subtle" icon-only slot="trigger">
        <svg>
          <use href="./img/edge/icons.svg#more-horizontal-20-regular" />
        </svg>
      </mai-button>
      <context-menu>
        ${when(
          (x) => x.ess.pinnedToolbarItems.includes('Extensions'),
          html` <menu-item
            @click="${(x) => x.ess.unpinToolbarItem('Extensions')}"
          >
            Hide extensions menu in toolbar
          </menu-item>`,
          html` <menu-item
            @click="${(x) => x.ess.pinToolbarItem('Extensions')}"
          >
            Show extensions menu in toolbar
          </menu-item>`,
        )}
      </context-menu>
    </flyout-menu>
  </div>
  <phx-divider appearance="strong"></phx-divider>
  <div id="content">
    ${repeat(
      (x) => x.extensions,
      html` <extension-hub-item
        @click="${(x, c) => c.parent.handleExtensionClick(x, apps[x].type)}"
        @pin="${(x, c) => c.parent.handleExtensionPin(c.event, x)}"
        ?pinned="${(x, c) => c.parent.ess.pinnedToolbarItems.includes(x)}"
      >
        <img
          slot="start"
          src="./img/edge/${(x) => x.toLowerCase()}AppLight.png"
          alt="Search icon"
        />
        ${(x) => x}
      </extension-hub-item>`,
    )}
    <phx-divider></phx-divider>
    <menu-item start-slot>
      <svg slot="start">
        <use href="./img/edge/icons.svg#puzzle-piece-20-regular" />
      </svg>
      Manage extensions
    </menu-item>
    <menu-item start-slot>
      <svg slot="start">
        <use href="./img/edge/icons.svg#store-microsoft-20-regular" />
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
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @observable extensions = ['Search', 'Grammarly', 'AdBlocker', 'Tools'];

  handleExtensionClick(id: string, type: ToolbarApp['type']) {
    if (type === 'sidepane') {
      this.ews.openSidepaneApp(id);
      this.ews.closeToolbarItem(); // close self
    } else this.ews.openToolbarItem(id);
  }

  handleExtensionPin(event: Event, extension: string) {
    event.stopPropagation();

    if (this.ess.pinnedToolbarItems.includes(extension))
      this.ess.unpinToolbarItem(extension);
    else this.ess.pinToolbarItem(extension);

    return false; // Prevent the click event from bubbling up
  }
}
