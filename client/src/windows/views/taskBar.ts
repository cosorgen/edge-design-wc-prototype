import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  spacingHorizontalL,
  strokeWidthThin,
  spacingHorizontalXS,
  colorNeutralStroke3,
} from '@phoenixui/themes';
import '../controls/taskbarButton.js';
import './clockWidget.js';
import './systemTray.js';
import '../controls/showDesktopButton.js';
import '../controls/showMoreButton.js';
import '../controls/copilotButton.js';
import '../controls/mica-material.js';
import './weatherWidget.js';

const template = html<TaskBar>`
  <mica-material></mica-material>
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
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${spacingHorizontalL};
    height: 48px;
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    padding-inline-start: ${spacingHorizontalXS};
    z-index: 1000;
    border-top: ${strokeWidthThin} solid ${colorNeutralStroke3};
    overflow: hidden;
  }

  mica-material {
    position: absolute;
    inset: 0;
    top: calc(1-${strokeWidthThin});
    z-index: -1;
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
export class TaskBar extends FASTElement {}
