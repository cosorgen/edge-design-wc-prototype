import { css } from '@microsoft/fast-element';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  ctrlOmniboxBackgroundHover,
  ctrlOmniboxBackgroundRest,
  ctrlOmniboxStrokeFocused,
  gapBetweenContentNone,
  gapBetweenContentXxsmall,
  gapInsideCtrlDefault,
  paddingContentNone,
  shadowFlyout,
  strokewidthDefault,
  cornerCircular,
  paddingContentXxsmall,
  ctrlOmniboxStrokeRest,
  ctrlOmniboxStrokeHover,
} from '@phoenixui/themes/kumo-tokens.js';

export const styles = css`
  :host {
    width: 1024px;
    min-width: 32px; /* Prevents the control from overflowing or collapsing */
    position: relative;
    height: 32px;
    --stroke-diff: calc(${strokewidthDefault} - ${strokewidthDefault});
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
    border: ${strokewidthDefault} solid ${ctrlOmniboxStrokeRest};
    border-radius: ${cornerCircular};
    padding: calc(${paddingContentXxsmall} + var(--stroke-diff))
      calc(${paddingContentXxsmall} + var(--stroke-diff));
    overflow: hidden;
  }

  :host(:not([dropdown-open]))
    [part='container']:has(omnibox-input:focus-within) {
    padding: ${paddingContentXxsmall} ${paddingContentXxsmall};
    border: ${strokewidthDefault} solid ${ctrlOmniboxStrokeFocused};
  }

  :host([dropdown-open]) [part='container'] {
    background-color: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyout};
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
    padding: ${paddingContentXxsmall} ${paddingContentNone};
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
    gap: ${gapBetweenContentXxsmall};
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
