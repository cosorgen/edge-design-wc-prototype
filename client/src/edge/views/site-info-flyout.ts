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
  gapBetweenContentXxSmall,
  paddingContentXSmall,
  ctrlListCornerRest,
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtleRest,
  textRampItemBodyFontSize,
  textStyleDefaultRegularWeight,
  textStyleDefaultRegularFontFamily,
  paddingContentXxSmall,
  textStyleDataVizHeaderWeight,
  textStyleDataVizHeaderFontFamily,
  textGlobalCaption1FontSize,
  foregroundCtrlNeutralSecondaryRest,
} from '@mai-ui/design-tokens/tokens.js';
import {
  ctrlDialogPadding,
  strokeWidthCardDefault,
} from '@mai-ui/design-tokens/mai-tokens.js';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import '@mai-ui/button/define.js';
import '@mai-ui/divider/define.js';
import '@mai-ui/switch/define.js';
import EdgePermissionsService from '#servicespermissionsService.js';

const template = html<SiteInfoFlyout>`
  <div part="header">
    <div id="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname}
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
    <div class="menu-section">
      <button class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#lock-closed-20-regular" />
        </svg>
        <div>Connection is secure</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
    </div>
    <mai-divider appearance="subtle"></mai-divider>
    <div class="menu-section">
      <button class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#breifcase-20-regular" />
        </svg>
        <div>Microsoft Purview</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
    </div>
    <mai-divider appearance="subtle"></mai-divider>
    <div class="menu-section">
      <div class="section-header">Permissions for this site</div>
      <div class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#video-20-regular" />
        </svg>
        <div>Camera</div>
        <mai-switch></mai-switch>
      </div>
      <div class="menu-item">
        <mai-button appearance="outline"> Reset permission </mai-button>
      </div>
    </div>
    <mai-divider appearance="subtle"></mai-divider>
    <div class="menu-section">
      <button class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#cookies-20-regular" />
        </svg>
        <div>Cookies and site data</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
      <button class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#settings-20-regular" />
        </svg>
        <div>Site settings</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
    </div>
    <mai-divider appearance="subtle"></mai-divider>
    <div class="menu-section">
      <div class="menu-item">
        <svg>
          <use href="img/edge/icons.svg#video-security-20-regular" />
        </svg>
        <div>Tracking prevention for this site</div>
        <mai-switch checked></mai-switch>
      </div>
      <button class="menu-item">
        <svg></svg>
        <div>Trackers (0 blocked)</div>
        <svg>
          <use href="img/edge/icons.svg#chevron-right-20-regular" />
        </svg>
      </button>
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
    padding-block: ${ctrlDialogPadding};
  }

  [part='header'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: ${textStyleDefaultHeaderWeight};
    padding-inline: ${ctrlDialogPadding};
  }

  [part='body'] {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXxSmall};
  }

  .menu-section {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXxSmall};
    padding-inline: ${ctrlDialogPadding};
    padding-block: ${paddingContentXxSmall};
  }

  .section-header {
    font-family: ${textStyleDataVizHeaderFontFamily};
    font-size: ${textGlobalCaption1FontSize};
    font-weight: ${textStyleDataVizHeaderWeight};
    color: ${foregroundCtrlNeutralSecondaryRest};
    padding-inline: ${paddingContentXSmall};
  }

  .menu-item {
    all: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXSmall};
    padding: ${paddingContentXSmall};
    border-radius: ${ctrlListCornerRest};
    background: ${backgroundCtrlSubtleRest};

    div {
      flex: 1;
      font-family: ${textStyleDefaultRegularFontFamily};
      font-size: ${textRampItemBodyFontSize};
      font-weight: ${textStyleDefaultRegularWeight};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  button.menu-item:hover {
    cursor: pointer;
    background-color: ${backgroundCtrlSubtleHover};
  }
`;

@customElement({ name: 'site-info-flyout', template, styles })
export default class SiteInfoFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
  }

  addEventListeners() {
    this.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}
