import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  /* Composer */

  :host([block-position='end']) #composer {
    /* bottom halfway in margin */
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - (${spacingFrame} / 2)
    );
  }

  :host([block-position='end'][ntp]) #composer {
    /* All the way on page */
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  :host([block-position='end']:not([active])) #composer {
    /* Hidden off the edge */
    inset-block-start: 100%;
  }

  /* Hint target */

  :host([block-position='end']) #hint-target {
    /* Align to bottom of window */
    inset-block-start: calc(100% - var(--hint-target-height));
  }

  /* Grabber */

  :host([block-position='end']) #grabber {
    /* Centered in margin */
    inset-block-start: calc(
      100% - (var(--grabber-height) / 2) - (${spacingFrame} / 2)
    );
  }

  :host([active][block-position='end']) #grabber {
    /* Align to top of composer when it's in margin */
    inset-block-start: calc(100% - var(--composer-expanded-height));
  }

  :host([active][block-position='end'][ntp]) #grabber {
    /* Align to top of composer when it's All the way on page */
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - var(--ntp-inset)
    );
  }

  :host([hint][block-position='end']) #grabber,
  :host([hint][block-position='end'][ntp]) #grabber,
  :host([active][block-position='end'][dragging]) #grabber {
    /* Align to top of hint composer */
    inset-block-start: calc(
      100% - (var(--grabber-height) / 2) - (${spacingFrame} / 2) -
        (var(--composer-retracted-height) / 4)
    );
  }

  /* Hint composer */

  :host([block-position='end']) #hint-composer {
    /* Hidden off the edge */
    inset-block-start: 100%;
  }

  :host([active][block-position='end']) #hint-composer {
    /* bottom halfway in margin */
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - (${spacingFrame} / 2)
    );
  }

  :host([active][block-position='end'][ntp]) #hint-composer {
    /* All the way on page */
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  :host([hint][block-position='end']) #hint-composer,
  :host([active][block-position='end'][dragging]) #hint-composer {
    /* Half off the edge */
    inset-block-start: calc(100% - var(--composer-retracted-height) / 2);
  }
`;
