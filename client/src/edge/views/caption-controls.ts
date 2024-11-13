import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { spacingFrame } from '../designSystem.js';
import {
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '../../windows/designSystem.js';
import '@phoenixui/web-components/button.js';

const template = html` <phx-button
    size="large"
    appearance="subtle"
    shape="square"
    icon-only
    @click="${(x) => x.minimizeWindow()}"
  >
    <svg>
      <use href="img/edge/icons.svg#chrome-minimize-20-regular" x="2" y="2" />
    </svg>
  </phx-button>
  <phx-button
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
  </phx-button>
  <phx-button
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
  </phx-button>`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-block: calc(0px - ${spacingFrame} * 1.5)
      calc(0px - ${spacingFrame} * 0.5);
  }

  #close:hover {
    background-color: ${colorShellFillCaptionControlPrimaryHover};
    color: ${colorShellForegroundCaptionControlPrimaryHover};
  }

  #close:active {
    background-color: ${colorShellFillCaptionControlPrimaryPressed};
    color: ${colorShellForegroundCaptionControlPrimaryPressed};
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
