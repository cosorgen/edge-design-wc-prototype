import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  /* Composer */

  :host([inline-position='sidepane']) #composer {
    /* Start halfway in margin */
    inset-inline-start: calc(100% - var(--sidepane-width) - ${spacingFrame});
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
