import { css } from '@microsoft/fast-element';
import { spacingHorizontalM } from '@edge-design/copilot-theme';

export default css`
  /* Composer */

  :host([inline-position='sidepane']) #composer {
    /* Start halfway in margin */
    inset-inline-start: calc(
      100% - var(--sidepane-width) - var(--paddingWindowDefault) +
        ${spacingHorizontalM}
    );
  }

  /* Hint target */

  :host([inline-position='sidepane']) #hint-target {
    /* Align to end */
    inset-inline-start: calc(100% - var(--hint-target-height));
  }

  /* Grabber */

  :host([inline-position='sidepane']) #grabber,
  :host([inline-position='sidepane']) #grabber-no-hint {
    inset-inline-start: calc(
      100% - var(--grabber-height) / 2 - var(--paddingWindowDefault) / 2
    );
    opacity: 0;
  }

  /* Hint composer */

  :host([inline-position='sidepane']) #hint-composer {
    /* Peek 25% of composer size */
    inset-inline-start: calc(100% - var(--composer-retracted-width) * 0.25);
  }
`;
