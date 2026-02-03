import { css } from '@microsoft/fast-element';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  ctrlOmniboxBackgroundHover,
  ctrlOmniboxBackgroundRest,
  ctrlOmniboxStrokeFocused,
  gapBetweenContentNone,
  gapBetweenContentXxSmall,
  gapInsideCtrlDefault,
  paddingContentNone,
  shadowFlyoutAmbient,
  shadowFlyoutKey,
  strokeWidthDefault,
  cornerCircular,
  paddingContentXxSmall,
  ctrlOmniboxStrokeRest,
  ctrlOmniboxStrokeHover,
} from '@phoenixui/themes/smtc-tokens.js';

export const styles = css`
  :host {
    width: 1024px;
    min-width: 32px; /* Prevents the control from overflowing or collapsing */
    position: relative;
    height: 32px;
    --stroke-diff: calc(${strokeWidthDefault} - ${strokeWidthDefault});
  }

  :host([active]) {
    display: block;
  }

  :host([full-width]) {
    width: 100%;
  }

  [part='container'] {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${ctrlOmniboxBackgroundRest};
    border: ${strokeWidthDefault} solid ${ctrlOmniboxStrokeRest};
    border-radius: ${cornerCircular};
    padding: calc(${paddingContentXxSmall} + var(--stroke-diff))
      calc(${paddingContentXxSmall} + var(--stroke-diff));
    overflow: hidden;
  }

  :host(:not([dropdown-open]))
    [part='container']:has(omnibox-input:focus-within) {
    padding: ${paddingContentXxSmall} ${paddingContentXxSmall};
    border: ${strokeWidthDefault} solid ${ctrlOmniboxStrokeFocused};
  }

  :host([dropdown-open]) [part='container'] {
    background-color: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyoutAmbient}, ${shadowFlyoutKey};
    padding: 0px;
    border: none;
  }

  :host(:not([dropdown-open])) [part='container']:has(omnibox-input:hover) {
    background-color: ${ctrlOmniboxBackgroundHover};
    border-color: ${ctrlOmniboxStrokeHover};
  }

  :host([dropdown-open]) [part='container'] {
    border-color: transparent;
  }

  #top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapInsideCtrlDefault};
  }

  :host([dropdown-open]) #top-row {
    padding: ${paddingContentXxSmall} ${paddingContentNone};
    gap: ${gapBetweenContentNone};

    #status {
      flex: 0;
      min-width: unset;
    }
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
    gap: ${gapBetweenContentXxSmall};
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
