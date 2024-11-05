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
    inset-inline-start: calc(0px - var(--composer-retracted-width));
  }

  /* Hint target */

  :host([inline-position='start']) #hint-target {
    /* Half off screen */
    inset-inline-start: calc(0% - var(--hint-target-width) / 2);
  }

  /* Grabber */

  :host([inline-position='start']) #grabber {
    /* Start half off with retracted width */
    inset-inline-start: calc(0% + ${spacingFrame} * 2);
  }

  :host([inline-position='start'][hint]) #grabber,
  :host([inline-position='start'][active][dragging]) #grabber {
    /* Start half off with expanded width */
    inset-inline-start: calc(0% - var(--grabber-expanded-width) / 2);
  }

  /* Hint composer */

  :host([inline-position='start'][active]) #hint-composer {
    /* Start half in margin */
    inset-inline-start: calc(0% + ${spacingFrame} / 2);
  }

  :host([inline-position='start'][active][ntp]) #hint-composer {
    /* Start over ntp */
    inset-inline-start: calc(0% + ${spacingFrame} + var(--ntp-inset));
  }

  :host([inline-position='start']) #hint-composer,
  :host([inline-position='start'][active][dragging]) #hint-composer {
    /* Start half off with retracted width */
    inset-inline-start: calc(0% - var(--composer-retracted-width) / 2);
  }
`;
