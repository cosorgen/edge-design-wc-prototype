import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  /* Composer */

  :host([inline-position='start']) #composer {
    /* Start halfway in margin */
    inset-inline-start: calc(${spacingFrame} / 2);
  }

  :host([inline-position='start'][ntp]) #composer {
    /* Start over ntp page */
    inset-inline-start: calc(${spacingFrame} / 2 + var(--ntp-inset));
  }

  :host([inline-position='start']:not([active])) #composer {
    /* Start off edge of window */
    inset-inline-start: calc(0% - var(--composer-retracted-width));
  }

  /* Hint target */

  :host([inline-position='start']) #hint-target {
    /* Half off screen */
    inset-inline-start: 0%;
  }

  /* Grabber */

  :host([inline-position='start']) #grabber {
    /* Start centered in the margin */
    inset-inline-start: calc(${spacingFrame} / 2 - var(--grabber-height) / 2);
  }

  :host([inline-position='start'][active]) #grabber {
    /* Offset composer expanded width + half of margin */
    inset-inline-start: calc(
      var(--composer-expanded-width) + ${spacingFrame} / 2
    );
  }

  :host([inline-position='start'][hint]) #grabber,
  :host([inline-position='start'][dragging]) #grabber {
    /* Offset 10% of composer retracted width */
    inset-inline-start: calc(var(--composer-retracted-width) * 0.1);
  }

  /* Hint composer */

  :host([inline-position='start']) #hint-composer {
    /* Start all the way off window */
    inset-inline-start: calc(0% - var(--composer-retracted-width));
  }

  :host([inline-position='start'][active]) #hint-composer {
    /* Start half in margin */
    inset-inline-start: calc(${spacingFrame} / 2);
  }

  :host([inline-position='start'][active][ntp]) #hint-composer {
    /* Start over ntp */
    inset-inline-start: calc(${spacingFrame} + var(--ntp-inset));
  }

  :host([inline-position='start'][hint]) #hint-composer,
  :host([inline-position='start'][dragging]) #hint-composer {
    /* Peek 24px off size */
    inset-inline-start: calc(0% - var(--composer-retracted-width) * 0.75);
  }
`;
