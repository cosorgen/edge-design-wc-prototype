import { display } from "@fluentui/web-components/utilities.js";
import { css } from "@microsoft/fast-element";

/** Menu styles
 * @public
 */
export const styles = css`
  ${display("inline-block")}

  ::slotted([slot='trigger']) {
    anchor-name: --menu-trigger;
  }

  ::slotted([popover]) {
    border-radius: 12px; /* TODO: replace with design token */
    position-area: block-end span-inline-end;
    margin: 0;
    max-height: var(--menu-max-height, auto);
    position-anchor: --menu-trigger;
    position-try-fallbacks: flip-block;
    position: fixed; /* TODO: Follow up on implications of this */
    z-index: 1;
  }

  ::slotted([popover]:popover-open) {
    inset: unset;
  }

  ::slotted([popover]:not(:popover-open)) {
    display: none;
  }
`;
