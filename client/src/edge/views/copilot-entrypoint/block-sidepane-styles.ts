import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  /* Composer */

  :host([block-position='sidepane']) #composer {
    /* Align to bottom - 1/2 margin */
    inset-block-start: calc(
      100% - var(--composer-retracted-height) - ${spacingFrame}
    );
  }

  /* Hint target */

  /* Grabber */

  :host([block-position='sidepane']) #grabber,
  :host([block-position='sidepane']) #grabber-no-hint {
    /* Centered vertically based on expanded width */
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--grabber-vertical-expanded-width) / 2)
    );
  }

  /* Hint composer */
`;
