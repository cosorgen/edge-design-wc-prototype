import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorSubtleBackgroundHover,
  spacingHorizontalM,
  spacingHorizontalS,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';

const template = html<ExtensionHubItem>` <div id="start">
    <slot name="start"></slot>
  </div>
  <div id="main">
    <slot></slot>
  </div>
  <div id="end">
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#pin-20-regular" />
      </svg>
    </phx-button>
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#more-horizontal-20-regular" />
      </svg>
    </phx-button>
  </div>`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalS};
    padding-inline-start: ${spacingHorizontalS};
    cursor: pointer;
    border-radius: ${borderRadiusMedium};
  }

  :host(:hover) {
    background-color: ${colorSubtleBackgroundHover};
  }

  #start ::slotted(*) {
    width: 20px;
    height: 20px;
    line-height: 0;
    object-fit: contain;
  }

  #start,
  #end {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #end {
    margin-inline-start: ${spacingHorizontalM};
  }

  #main {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 16px;
  }
`;

@customElement({
  name: 'extension-hub-item',
  template,
  styles,
})
export class ExtensionHubItem extends FASTElement {}
