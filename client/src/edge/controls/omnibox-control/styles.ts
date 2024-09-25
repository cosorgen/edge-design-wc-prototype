import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusLayerDialog,
  colorBrandStroke1,
  colorLayerBackgroundDialog,
  colorNeutralForegroundHint,
  shadow28,
  spacingHorizontalNone,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalXS,
  spacingVerticalXXS,
  strokeWidthThick,
  strokeWidthThin,
} from '@phoenixui/themes';
import {
  colorLayerOmniboxBackground,
  colorLayerOmniboxBackgroundHover,
} from '../../designSystem.js';

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
    background-color: ${colorLayerOmniboxBackground};
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
    border-radius: ${borderRadiusLayerDialog};
    box-shadow: ${shadow28};
  }

  [part='container']:not([dropdown-open]):hover {
    background-color: ${colorLayerOmniboxBackgroundHover};
  }

  #top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};

    #status,
    #actions {
      flex: 1;
      min-width: 256px;
    }
  }

  [dropdown-open] #top-row {
    padding: ${spacingVerticalXS} ${spacingHorizontalNone};
    gap: ${spacingHorizontalNone};

    #status {
      flex: 0;
      min-width: unset;
    }
    omnibox-input {
      flex: 1;
    }
  }

  #status,
  #actions {
    display: flex;
    flex-direction: row;
    cursor: text;
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
    display: unset;
  }

  omnibox-icon {
    display: none;
  }

  [dropdown-open] omnibox-icon {
    display: unset;
  }

  [dropdown-open] omnibox-status {
    display: none;
  }
`;
