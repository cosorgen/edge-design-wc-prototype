import { FASTElement, customElement, css, html } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralForeground1,
  colorSubtleBackgroundHover,
  fontFamilyBase,
  fontSizeBase300,
  lineHeightBase300,
  spacingHorizontalL,
} from '@phoenixui/themes';

export type MoreMenuEntry = {
  title?: string;
  type: 'action' | 'sub-menu' | 'divider' | 'zoom';
  shortcut?: string;
};

const template = html<MenuItem>` <button
    @click="${(x) => x.$emit('closemenu')}"
  >
    <div id="start"><slot name="start"></slot></div>
    <div id="content"><slot>Menu item</slot></div>
    <div id="end"><slot name="end"></slot></div>
  </button>
  <slot name="end-action"></slot>`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  button {
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalL};
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: ${borderRadiusMedium};

    /* Body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground1};
  }

  button:hover {
    background: ${colorSubtleBackgroundHover};
  }

  #start,
  #end {
    display: none;
  }

  :host([start-slot]) #start,
  :host([end-slot]) #end {
    display: block;
  }

  #content {
    flex: 1;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
  }

  button:has(::slotted(phx-button)) {
    padding-inline-end: 0;
  }
`;

@customElement({
  name: 'menu-item',
  template,
  styles,
})
export default class MenuItem extends FASTElement {}
