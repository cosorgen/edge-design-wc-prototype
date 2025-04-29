import {
  css,
  customElement,
  FASTElement,
  html,
  observable,
  repeat,
  when,
} from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import '@mai-ui/divider/define.js';
import '../../controls/extension-hub-item.js';
import '../../controls/context-menu.js';
import '../../controls/menu-item.js';
import '../../controls/flyout-menu.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import apps, { ToolbarApp } from '../../installedApps.js';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundContentNeutralPrimary,
  paddingContentMedium,
  shadowFlyout,
  textGlobalBody2Fontsize,
  textGlobalBody2Lineheight,
  textStyleDefaultHeaderWeight,
  textStyleDefaultRegularFontfamily,
  gapBetweenContentXxsmall,
} from '@phoenixui/themes/kumo-tokens.js';

const template = html<ExtensionsHub>` <div id="header">
    <span>Extensions</span>
    <div id="actions">
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
      <mai-button size="small" appearance="subtle" icon-only>
        <svg>
          <use href="./img/edge/icons.svg#dismiss-16-regular" />
        </svg>
      </mai-button>
    </div>
  </div>
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
  </div>
  <mai-divider appearance="subtle"></mai-divider>
  <div id="footer">
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
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyout};
    overflow: hidden;
    color: ${foregroundContentNeutralPrimary};
  }

  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${paddingContentMedium};
    padding-block-end: 0;

    font-family: ${textStyleDefaultRegularFontfamily};
    font-size: ${textGlobalBody2Fontsize};
    font-weight: ${textStyleDefaultHeaderWeight};
    line-height: ${textGlobalBody2Lineheight};
  }

  #actions {
    display: flex;
    flex-direction: row;
    gap: ${gapBetweenContentXxsmall};
  }

  #content {
    display: flex;
    flex-direction: column;
    padding: ${paddingContentMedium};
  }

  #footer {
    display: flex;
    flex-direction: column;
    padding: ${paddingContentMedium};
  }
`;

@customElement({ name: 'extensions-hub', template, styles })
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
