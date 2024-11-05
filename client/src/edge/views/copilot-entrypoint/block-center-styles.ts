import { css } from '@microsoft/fast-element';

export default css`
  /* Composer */

  :host([block-position='center']) #composer {
    /* Centered vertically based on expanded height */
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--composer-expanded-height) / 2)
    );
  }

  /* Hint target */
`;
