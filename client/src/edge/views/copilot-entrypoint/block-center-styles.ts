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

  :host([block-position='center']) #hint-target {
    /* Centered vertically */
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--hint-target-width) / 2)
    );
  }

  /* Grabber */

  :host([block-position='center']) #grabber {
    /* Centered vertically based on retracted width */
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--grabber-vertical-retracted-width) / 2)
    );
  }

  :host([block-position='center'][hint]) #grabber,
  :host([block-position='center'][dragging]) #grabber {
    /* Centered vertically based on expanded width */
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--grabber-vertical-expanded-width) / 2)
    );
  }

  /* Hint composer */

  :host([block-position='center']) #hint-composer {
    /* Centered vertically */
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--composer-retracted-height) / 2)
    );
  }
`;
