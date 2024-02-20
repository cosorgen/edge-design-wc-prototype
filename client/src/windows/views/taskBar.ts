import {
  FASTElement,
  css,
  customElement,
  html,
  repeat,
} from '@microsoft/fast-element';
import { colorNeutralStroke1, strokeWidthThin } from '@fluentui/web-components';
import { spacingHorizontalL } from '@phoenixui/themes';
import '@fluentui/web-components/text.js';
import '../controls/taskbarButton.js';
import './clockWidget.js';
import './systemTray.js';
import './showDesktopButton.js';
import './showMoreButton.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '../../services/windowsService.js';

const template = html<TaskBar>`
  <div class="group">
    <weather-widget></weather-widget>
  </div>
  <div class="group">
    ${repeat(
      (x) => x.ws.apps,
      html`
        <taskbar-button>
          <img
            src="${(x, c) =>
              c.parent.ws.theme === 'dark' && x.darkIcon
                ? x.darkIcon
                : x.lightIcon}"
          />
        </taskbar-button>
      `,
    )}
  </div>
  <div class="group">
    <show-more-button></show-more-button>
    <system-tray></system-tray>
    <clock-widget></clock-widget>
    <show-desktop-button></show-desktop-button>
  </div>
`;

const styles = css`
  :host {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${spacingHorizontalL};
    height: 48px;
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    border-top: var(${strokeWidthThin}) solid var(${colorNeutralStroke1});
    /* Mica */
    backdrop-filter: blur(120px) saturate(150%);
    background: #f0f0f0b9;
    background-blend-mode: luminosity;
  }
  .group {
    height: 100%;
    display: flex;
    align-items: center;

    &:first-of-type {
      justify-content: flex-start;
    }

    &:nth-of-type(2) {
      justify-content: center;
    }

    &:last-of-type {
      justify-content: flex-end;
    }
  }
`;

@customElement({
  name: 'task-bar',
  template,
  styles,
})
export class TaskBar extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
}
