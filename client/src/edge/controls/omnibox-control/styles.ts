import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorBrandStroke1,
  colorLayerBackgroundDialog,
  colorNeutralBackground3,
  colorNeutralBackground3Hover,
  colorNeutralForegroundHint,
  shadow28,
  spacingHorizontalNone,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalS,
  spacingVerticalXXS,
  strokeWidthThick,
  strokeWidthThin,
} from '@phoenixui/themes';

export const styles = css`
  :host {
    width: 1024px;
    min-width: 32px; /* Prevents the control from overflowing or collapsing */
    position: relative;
    display: none;
    height: 32px;
    --stroke-diff: calc(${strokeWidthThick} - ${strokeWidthThin});
  }

  :host([active]) {
    display: block;
  }

  [part='container'] {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${colorNeutralBackground3};
    border: ${strokeWidthThin} solid transparent;
    border-radius: ${borderRadiusCircular};
    padding: calc(${spacingVerticalXXS} + var(--stroke-diff))
      calc(${spacingHorizontalXXS} + var(--stroke-diff));
  }

  [part='container']:has(omnibox-input:focus-within):not([dropdown-open]) {
    padding: ${spacingVerticalXXS} ${spacingHorizontalXXS};
    border: ${strokeWidthThick} solid ${colorBrandStroke1};
  }

  [part='container'][dropdown-open] {
    background-color: ${colorLayerBackgroundDialog};
    border-radius: 16px; /* Override from design system to make radius match pill */
    box-shadow: ${shadow28};
  }

  [part='container']:not([dropdown-open]):hover {
    background-color: ${colorNeutralBackground3Hover};
  }

  #top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  [dropdown-open] #top-row {
    padding: ${spacingVerticalS} ${spacingHorizontalNone};
    gap: ${spacingHorizontalNone};
  }

  #actions {
    display: flex;
    flex-direction: row;

    phx-button::part(content) {
      color: ${colorNeutralForegroundHint};
    }
  }

  [dropdown-open] #actions {
    display: none;
  }

  omnibox-dropdown {
    display: none;
  }

  [dropdown-open] omnibox-dropdown {
    display: inherit;
  }

  omnibox-icon {
    display: none;
  }

  [dropdown-open] omnibox-icon {
    display: inherit;
  }

  [dropdown-open] omnibox-status {
    display: none;
  }
`;
