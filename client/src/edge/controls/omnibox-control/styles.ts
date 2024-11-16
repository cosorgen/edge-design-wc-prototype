import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusLayerDialog,
  colorBrandStroke1,
  colorLayerBackgroundDialog,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralForegroundHint,
  colorNeutralStroke1,
  shadow28,
  spacingHorizontalNone,
  spacingHorizontalXXS,
  spacingVerticalXS,
  spacingVerticalXXS,
  strokeWidthThick,
  strokeWidthThin,
} from '@phoenixui/themes';
import { spacingFrame } from '../../designSystem.js';

export const styles = css`
  :host {
    width: 100%;
    min-width: 32px; /* Prevents the control from overflowing or collapsing */
    position: relative;
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
    background-color: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-radius: ${borderRadiusCircular};
    padding: calc(${spacingVerticalXXS} + var(--stroke-diff))
      calc(${spacingHorizontalXXS} + var(--stroke-diff));
  }

  :host(:not([dropdown-open]))
    [part='container']:has(omnibox-input:focus-within) {
    padding: ${spacingVerticalXXS} ${spacingHorizontalXXS};
    border: ${strokeWidthThick} solid ${colorBrandStroke1};
  }

  :host([dropdown-open]) [part='container'] {
    background-color: ${colorLayerBackgroundDialog};
    border-radius: ${borderRadiusLayerDialog};
    box-shadow: ${shadow28};
  }

  :host(:not([dropdown-open])) [part='container']:has(omnibox-input:hover) {
    background-color: ${colorNeutralBackground1Hover};
  }

  #top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingFrame};
  }

  :host([dropdown-open]) #top-row {
    padding: ${spacingVerticalXS} ${spacingHorizontalNone};
    gap: ${spacingHorizontalNone};
  }

  omnibox-input {
    flex: 1;
  }

  #status,
  #actions {
    display: flex;
    flex-direction: row;
    cursor: text;
    min-height: 24px;
    gap: ${spacingHorizontalXXS};
  }

  #status {
    justify-content: flex-start;
  }

  #top-row:has([value='']) {
    #status {
      justify-content: flex-end;
    }
  }

  #actions {
    justify-content: flex-end;
  }

  [name='actions']::slotted(phx-button) {
    color: ${colorNeutralForegroundHint};
  }

  :host([dropdown-open]) #actions {
    display: none;
  }

  omnibox-dropdown {
    display: none;
  }

  :host([dropdown-open]) omnibox-dropdown {
    display: unset;
  }

  omnibox-icon {
    display: none;
  }

  :host([dropdown-open]) omnibox-icon {
    display: unset;
  }

  :host([dropdown-open]) omnibox-status {
    display: none;
  }
`;
