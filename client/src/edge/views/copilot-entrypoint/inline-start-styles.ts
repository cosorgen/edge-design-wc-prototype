import { css } from '@microsoft/fast-element';
import { spacingFrame } from '@mai-ui/phoenix-theme';

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
    /* All the way off window */
    inset-inline-start: calc(0% - var(--composer-retracted-width));
  }

  /* Hint target */

  :host([inline-position='start']) #hint-target {
    /* Align to start */
    inset-inline-start: 0%;
  }

  /* Grabber */

  :host([inline-position='start']) #grabber,
  :host([inline-position='start']) #grabber-no-hint {
    /* Start centered in the margin */
    inset-inline-start: calc(${spacingFrame} / 2 - var(--grabber-height) / 2);
  }

  :host([inline-position='start'][active]) #grabber {
    /* Offset composer expanded width + margin */
    inset-inline-start: calc(var(--composer-expanded-width) + ${spacingFrame});
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
  :host([inline-position='start'][active][dragging]) #hint-composer {
    /* Peek 25% of composer size */
    inset-inline-start: calc(0% - var(--composer-retracted-width) * 0.75);
  }
`;
