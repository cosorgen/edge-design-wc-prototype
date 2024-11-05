import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  /* Composer */

  :host([block-position='start']) #composer {
    /* Center in margin */
    inset-block-start: calc(var(--viewport-top) - ${spacingFrame} / 2);
  }

  :host([block-position='start'][ntp]) #composer {
    /* Align to top of viewport + ntp inset */
    inset-block-start: calc(var(--viewport-top) + var(--ntp-inset));
  }

  :host([block-position='start']:not([active])) #composer {
    /* Off window */
    inset-block-start: calc(0% - var(--composer-retracted-height));
  }

  /* Hint target */

  :host([block-position='start']) #hint-target {
    /* Align to top of window */
    inset-block-start: 0%;
  }

  /* Hint target not centered */

  :host([block-position='start']:not([inline-position='center'])) #hint-target {
    /* Center on viewport top */
    inset-block-start: calc(var(--viewport-top) - var(--hint-target-width) / 2);
  }

  /* Grabber */

  :host([block-position='start']) #grabber {
    /* Center in margin */
    inset-block-start: calc(${spacingFrame} / 2 - var(--grabber-height) / 2);
  }

  :host([block-position='start'][active]) #grabber {
    /* Center in top 10% of composer */
    inset-block-start: calc(
      var(--viewport-top) + var(--composer-retracted-height) * 0.1 - var(
          --grabber-height
        ) / 2
    );
  }

  :host([block-position='start'][active][ntp]) #grabber {
    /* Center in top 10% of composer + ntp offset */
    inset-block-start: calc(
      var(--viewport-top) + var(--ntp-inset) + var(--composer-retracted-height) *
        0.1 - var(--grabber-height) / 2
    );
  }

  :host([block-position='start'][hint]) #grabber,
  :host([block-position='start'][active][dragging]) #grabber {
    /* Center in top 25% of hint composer */
    inset-block-start: calc(
      var(--grabber-height) / 2 + ${spacingFrame} +
        var(--composer-retracted-height) * 0.25
    );
  }

  /* Grabbber not centered */

  :host([block-position='start']:not([inline-position='center'])) #grabber {
    /* Alignt to top of viewport + ntp inset */
    inset-block-start: calc(var(--viewport-top) + var(--ntp-inset));
  }

  :host([block-position='start'][hint]:not([inline-position='center']))
    #grabber,
  :host([block-position='start'][dragging]:not([inline-position='center']))
    #grabber {
    /* Alignt to top of viewport + half expanded width - + ntp offset */
    inset-block-start: calc(
      var(--viewport-top) + (var(--grabber-vertical-expanded-width) / 2) +
        var(--ntp-inset)
    );
  }

  /* Hint composer */

  :host([block-position='start']) #hint-composer {
    /* Hide off screen - shadow */
    inset-block-start: calc(0% - var(--composer-retracted-height) - 8px);
  }

  :host([block-position='start'][active]) #hint-composer {
    /* top in margin */
    inset-block-start: calc(var(--viewport-top) - ${spacingFrame} / 2);
  }

  :host([block-position='start'][hint]) #hint-composer,
  :host([block-position='start'][active][dragging]) #hint-composer,
  :host([block-position='start'][active][dragging][ntp]) #hint-composer {
    /* half peek */
    inset-block-start: calc(0% - var(--composer-retracted-height) / 2);
  }

  :host([block-position='start'][active][ntp]) #hint-composer {
    /* over ntp */
    inset-block-start: calc(var(--viewport-top) + var(--ntp-inset));
  }

  /* Hint composer not centered */

  :host([block-position='start']:not([inline-position='center']))
    #hint-composer,
  :host(
      [block-position='start'][active][dragging]:not([inline-position='center'])
    )
    #hint-composer {
    /* Align top of viewport + ntp offset */
    inset-block-start: calc(var(--viewport-top) + var(--ntp-inset));
  }
`;
