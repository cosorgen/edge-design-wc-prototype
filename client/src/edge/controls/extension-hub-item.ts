import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralForeground1,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  spacingHorizontalM,
  spacingHorizontalS,
} from '@mai-ui/phoenix-theme';
import '@phoenixui/web-components/button.js';

const template = html<ExtensionHubItem>` <button tabindex="0">
    <div id="start">
      <slot name="start"></slot>
    </div>
    <div id="main">
      <slot></slot>
    </div>
  </button>
  <div id="end">
    <mai-button
      appearance="subtle"
      icon-only
      @click="${(x, c) => x.handlePinClick(c.event)}"
    >
      <svg>
        <use
          href="./img/edge/icons.svg#${(x) =>
            x.pinned ? 'pin-off' : 'pin'}-20-regular"
        />
      </svg>
    </mai-button>
    <mai-button
      appearance="subtle"
      icon-only
      @click="${(x, c) => {
        c.event.stopPropagation();
        return false;
      }}"
    >
      <svg>
        <use href="./img/edge/icons.svg#more-horizontal-20-regular" />
      </svg>
    </mai-button>
  </div>`;

const styles = css`
  :host {
    position: relative;
    color: ${colorNeutralForeground1};
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalS};
    padding: 0;
    padding-inline: ${spacingHorizontalS} 72px;
    height: 32px;
    cursor: pointer;
    border-radius: ${borderRadiusMedium};
    border: none;
    background-color: transparent;
    width: 100%;
    color: inherit;
  }

  button:hover {
    background-color: ${colorSubtleBackgroundHover};
  }

  button:active {
    background-color: ${colorSubtleBackgroundPressed};
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
    position: absolute;
    right: 0;
    top: 0;
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
export class ExtensionHubItem extends FASTElement {
  @attr({ mode: 'boolean' }) pinned = false;

  handlePinClick(e: Event) {
    e.stopPropagation();
    this.$emit('pin');
    return false;
  }
}
