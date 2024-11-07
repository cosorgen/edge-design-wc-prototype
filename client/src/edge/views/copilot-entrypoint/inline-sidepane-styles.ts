import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';
import { spacingHorizontalXL } from '@phoenixui/themes';

export default css`
  /* Composer */

  :host([inline-position='sidepane']) #composer {
    /* Start halfway in margin */
    inset-inline-start: calc(
      100% - var(--composer-sidepane-width) - ${spacingFrame} -
        ${spacingHorizontalXL}
    );
  }

  /* Hint target */

  /* Grabber */

  :host([inline-position='sidepane']) #grabber,
  :host([inline-position='sidepane']) #grabber-no-hint {
    inset-inline-start: calc(
      100% - var(--grabber-height) / 2 - ${spacingFrame} / 2
    );
    opacity: 0;
  }

  /* Hint composer */
`;
