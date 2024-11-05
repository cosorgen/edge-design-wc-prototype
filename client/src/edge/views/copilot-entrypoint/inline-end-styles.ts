import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  /* Composer */

  :host([inline-position='end']) #composer {
    /* Start half in the margin */
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${spacingFrame} / 2
    );
  }

  :host([inline-position='end'][ntp]) #composer {
    /* Start over ntp page */
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${spacingFrame} / 2 - var(
          --ntp-inset
        )
    );
  }

  :host([inline-position='end']:not([active])) #composer {
    /* All the way off screen */
    inset-inline-start: calc(100% + var(--composer-retracted-width));
  }

  /* Hint target */

  :host([inline-position='end']) #hint-target {
    /* Half off screen */
    inset-inline-start: calc(100% - var(--hint-target-width) / 2);
  }

  /* Grabber */

  :host([inline-position='end']) #grabber {
    /* Start half off with retracted width */
    inset-inline-start: calc(
      100% - var(--grabber-retracted-width) - ${spacingFrame} * 2
    );
  }

  :host([hint][inline-position='end']) #grabber,
  :host([active][inline-position='end'][dragging]) #grabber {
    /* Start half off with expanded width */
    inset-inline-start: calc(100% - var(--grabber-expanded-width) / 2);
  }

  /* Hint composer */

  :host([inline-position='end'][active]) #hint-composer {
    /* Start half in margin */
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${spacingFrame} / 2
    );
  }

  :host([inline-position='end'][active][ntp]) #hint-composer {
    /* Start over ntp */
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${spacingFrame} - var(--ntp-inset)
    );
  }

  :host([inline-position='end']) #hint-composer,
  :host([inline-position='end'][active][dragging]) #hint-composer {
    /* Start half off with retracted width */
    inset-inline-start: calc(100% - var(--composer-retracted-width) / 2);
  }
`;
