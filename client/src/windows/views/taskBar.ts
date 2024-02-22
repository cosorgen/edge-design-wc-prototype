import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  spacingHorizontalL,
  colorNeutralStroke1,
  strokeWidthThin,
  spacingHorizontalXS,
} from '@phoenixui/themes';
import { micaBackgroundColor } from '../designSystem.js';
import '@fluentui/web-components/text.js';
import '../controls/taskbarButton.js';
import './clockWidget.js';
import './systemTray.js';
import '../controls/showDesktopButton.js';
import '../controls/showMoreButton.js';
import '../controls/copilotButton.js';
import './weatherWidget.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '../../services/windowsService.js';

const template = html<TaskBar>`
  <div class="group">
    <weather-widget></weather-widget>
  </div>
  <div class="group">
    <slot></slot>
  </div>
  <div class="group">
    <show-more-button></show-more-button>
    <system-tray></system-tray>
    <clock-widget></clock-widget>
    <copilot-button></copilot-button>
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
    border-top: ${strokeWidthThin} solid ${colorNeutralStroke1};
    padding-inline-start: ${spacingHorizontalXS};
    /* Mica */
    backdrop-filter: blur(120px) saturate(150%);
    background: ${micaBackgroundColor};
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
