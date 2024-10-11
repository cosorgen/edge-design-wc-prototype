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

  :host(:not([dropdown-open])) [part='container']:hover {
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
      min-width: 25%;
    }
  }

  :host([dropdown-open]) #top-row {
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

  #rest-input {
    display: none;
    cursor: text;
  }

  :host([truncate-url]:not([dropdown-open])) #rest-input {
    display: block;
  }

  :host([truncate-url]:not([dropdown-open])) omnibox-input:not([value='']) {
    display: none;
  }
`;
