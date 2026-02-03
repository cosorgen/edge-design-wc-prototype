import { FASTElement, customElement, css, html } from '@microsoft/fast-element';
import {
  cornerCtrlRest,
  gapBetweenCtrlDefault,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
  textGlobalBody3FontSize,
  textGlobalBody3LineHeight,
  foregroundCtrlNeutralPrimaryRest,
  backgroundCtrlSubtleRest,
  backgroundCtrlSubtleHover,
  paddingContentMedium,
  paddingCtrlHorizontalDefault,
} from '@phoenixui/themes/smtc-tokens.js';

export type MoreMenuEntry = {
  title?: string;
  type: 'action' | 'sub-menu' | 'divider' | 'zoom' | 'label' | 'managed';
  shortcut?: string;
  keywords?: string[];
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
    gap: ${gapBetweenCtrlDefault};
    padding-inline: ${paddingCtrlHorizontalDefault};
    border: none;
    background: ${backgroundCtrlSubtleRest};
    cursor: pointer;
    border-radius: ${cornerCtrlRest};

    font-family: ${textStyleDefaultRegularFontFamily};
    font-weight: ${textStyleDefaultRegularWeight};
    font-size: ${textGlobalBody3FontSize};
    line-height: ${textGlobalBody3LineHeight};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  button:hover {
    background: ${backgroundCtrlSubtleHover};
  }

  #start,
  #end {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  #start ::slotted(*) {
    width: 20px;
    height: 20px;
    line-height: 0;
    object-fit: contain;
  }

  #end {
    margin-inline-start: ${paddingContentMedium};
  }

  :host([start-slot]) #start,
  :host([end-slot]) #end {
    display: flex;
  }

  #content {
    flex: 1;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
  }

  button:has(::slotted(mai-button)) {
    padding-inline-end: 0;
  }
`;

@customElement({ name: 'menu-item', template, styles })
export default class MenuItem extends FASTElement {}
