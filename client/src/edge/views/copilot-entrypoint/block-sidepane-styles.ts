import { css } from '@microsoft/fast-element';
import { spacingVerticalM, spacingFrame } from '@mai-ui/phoenix-theme';

export default css`
  /* Composer */

  :host([block-position='sidepane']) #composer {
    /* Align to bottom - 1/2 margin */
    inset-block-start: calc(
      100% - var(--composer-retracted-height) - ${spacingFrame} -
        ${spacingVerticalM}
    );
  }

  /* Hint target */

  :host([block-position='sidepane']) #hint-target {
    /* Centered vertically */
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--hint-target-width) / 2)
    );
  }

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

  :host([block-position='sidepane']) #hint-composer {
    /* Centered vertically */
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--composer-retracted-height) / 2)
    );
  }
`;
