import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsService from '#services/settingsService.js';
import {
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '@edge-design/windows-theme';
import '../controls/context-menu.js';
import '../controls/flyout-menu.js';
import '../controls/more-menu.js';
import '../controls/identity-control.js';
import '../controls/identity-flyout.js';
import '@edge-design/button/define.js';
import {
  backgroundCtrlNeutralRest,
  cornerCircular,
  gapBetweenContentXxsmall,
  paddingContentXsmall,
  paddingContentXxxsmall,
  paddingWindowDefault,
  strokeWidthDefault,
} from '@edge-design/kumo-theme/tokens.js';

const template = html` <div
    id="window-grabber"
    @mousedown="${(x, c) => x.handleTitleBarMouseDown(c.event)}"
    @contextmenu="${(x, c) => x.handleContextMenu(c.event)}"
  ></div>
  ${(x) =>
    !x.ss.showMenusInL1
      ? html`
          <div class="group" id="pill-menu">
            <flyout-menu>
              <mai-button
                size="small"
                appearance="subtle"
                shape="circular"
                icon-only
                slot="trigger"
              >
                <svg>
                  <use href="img/edge/icons.svg#more-horizontal-20-regular" />
                </svg>
              </mai-button>
              <more-menu
                managed
                @moreaction="${(x, c) =>
                  x.handleMoreAction(c.event as CustomEvent)}"
              ></more-menu>
            </flyout-menu>
            <flyout-menu>
              <identity-control
                appearance="signedIn"
                slot="trigger"
              ></identity-control>
              <identity-flyout></identity-flyout>
            </flyout-menu>
          </div>
        `
      : ''}
  <mai-button
    size="large"
    appearance="subtle"
    shape="square"
    icon-only
    @click="${(x) => x.minimizeWindow()}"
  >
    <svg>
      <use href="img/edge/icons.svg#chrome-minimize-20-regular" x="2" y="2" />
    </svg>
  </mai-button>
  <mai-button
    size="large"
    appearance="subtle"
    shape="square"
    icon-only
    @click="${(x) => x.maximizeWindow()}"
  >
    <svg>
      <use
        href="${(x) =>
          x.windowIsMaximized()
            ? 'img/edge/icons.svg#chrome-restore-20-regular'
            : 'img/edge/icons.svg#chrome-maximize-20-regular'}"
        x="2"
        y="2"
      />
    </svg>
  </mai-button>
  <mai-button
    size="large"
    appearance="subtle"
    shape="square"
    icon-only
    @click="${(x) => x.closeWindow()}"
    id="close"
  >
    <svg>
      <use href="img/edge/icons.svg#chrome-close-20-regular" x="2" y="2" />
    </svg>
  </mai-button>`;

const styles = css`
  :host {
    --caption-controls-height: calc(
      32px + 2 * ${paddingWindowDefault}
    ); /* height of a button + gaps */
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    inset-inline-end: max(
      /* equal spacing top and right */
        calc((var(--caption-controls-height) - 40px) / 2),
      0px
    );
    inset-block-start: 0;
    height: var(--caption-controls-height);
    width: ${(x) => (x.ews.activeSidepaneAppId ? '384px' : '186px')};

    --smtc-corner-ctrl-rest: 0px;
    --smtc-corner-ctrl-hover: 0px;
    --smtc-corner-ctrl-pressed: 0px;
    --smtc-corner-ctrl-selected: 0px;
  }

  #close:hover {
    background-color: ${colorShellFillCaptionControlPrimaryHover};
    color: ${colorShellForegroundCaptionControlPrimaryHover};
  }

  #close:active {
    background-color: ${colorShellFillCaptionControlPrimaryPressed};
    color: ${colorShellForegroundCaptionControlPrimaryPressed};
  }

  #pill-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: ${paddingContentXsmall};
    padding: calc(${paddingContentXxxsmall} - ${strokeWidthDefault})
      ${paddingContentXxxsmall};
    gap: ${gapBetweenContentXxsmall};
    border-radius: ${cornerCircular};
    background-color: ${backgroundCtrlNeutralRest};
  }

  #window-grabber {
    flex: 1;
    height: 100%;
  }
`;

@customElement({ name: 'caption-controls', template, styles })
export class CaptionControls extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;

  closeWindow() {
    this.ws.closeWindow(this.ews.id);
  }

  minimizeWindow() {
    this.ws.minimizeWindow(this.ews.id);
  }

  windowIsMaximized() {
    return this.ws.getWindowById(this.ews.id)?.maximized || false;
  }

  maximizeWindow() {
    this.ws.maximizeWindow(this.ews.id, !this.windowIsMaximized());
  }
}
