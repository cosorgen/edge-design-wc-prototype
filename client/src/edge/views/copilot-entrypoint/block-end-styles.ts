import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  /* Composer */

  /* Hidden off the edge */
  :host(:not([active])) #composer[block-position='end'] {
    inset-block-start: 100%;
  }

  /* bottom halfway in margin */
  #composer[block-position='end'] {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - (${spacingFrame} / 2)
    );
  }

  /* All the way on page */
  #composer[block-position='end'][ntp] {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  /* Hint target */

  /* Align to bottom of window */
  :host:has(#composer[block-position='end']) #hint-target {
    inset-block-start: calc(100% - var(--hint-target-height));
  }

  /* Grabber */

  /* Centered in margin */
  :host:has(#composer[block-position='end']) #grabber {
    inset-block-start: calc(
      100% - (var(--grabber-height) / 2) - (${spacingFrame} / 2)
    );
  }

  /* Align to top of composer when it's in margin */
  :host([active]):has(#composer[block-position='end']) #grabber {
    inset-block-start: calc(100% - var(--composer-expanded-height));
  }

  /* Align to top of composer when it's All the way on page */
  :host([active]):has(#composer[block-position='end'][ntp]) #grabber {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - var(--ntp-inset)
    );
  }

  /* Align to top of hint composer */
  :host([hint]):has(#composer[block-position='end']) #grabber,
  :host([hint]):has(#composer[block-position='end'][ntp]) #grabber,
  :host([active]):has(#composer[block-position='end'][dragging]) #grabber {
    inset-block-start: calc(
      100% - (var(--grabber-height) / 2) - (${spacingFrame} / 2) -
        (var(--composer-retracted-height) / 4)
    );
  }

  /* Hint composer */

  /* Hidden off the edge */
  :host:has(#composer[block-position='end']) #hint-composer {
    inset-block-start: 100%;
  }

  /* bottom halfway in margin */
  :host([active]):has(#composer[block-position='end']) #hint-composer {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - (${spacingFrame} / 2)
    );
  }

  /* All the way on page */
  :host([active]):has(#composer[block-position='end'][ntp]) #hint-composer {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  /* Half off the edge */
  :host([hint]):has(#composer[block-position='end']) #hint-composer,
  :host([active]):has(#composer[block-position='end'][dragging])
    #hint-composer {
    inset-block-start: calc(100% - var(--composer-retracted-height) / 2);
  }
`;
