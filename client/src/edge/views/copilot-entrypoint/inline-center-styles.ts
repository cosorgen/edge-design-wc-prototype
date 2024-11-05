import { css } from '@microsoft/fast-element';

export default css`
  /* Composer */

  :host([inline-position='center']:not([active])) #composer {
    /* Centered with retracted width */
    inset-inline-start: calc(50% - (var(--composer-retracted-width) / 2));
  }

  :host([inline-position='center']) #composer {
    /* Centered with expanded width */
    inset-inline-start: calc(50% - (var(--composer-expanded-width) / 2));
  }

  /* Hint target */

  :host([inline-position='center']) #hint-target {
    /* Centered */
    inset-inline-start: calc(50% - var(--hint-target-width) / 2);
  }

  /* Grabber */

  :host([inline-position='center']) #grabber {
    /* Centered with retracted width */
    inset-inline-start: calc(50% - var(--grabber-retracted-width) / 2);
  }

  :host([hint][inline-position='center']) #grabber,
  :host([active][inline-position='center'][dragging]) #grabber {
    /* Centered with expanded width */
    inset-inline-start: calc(50% - var(--grabber-expanded-width) / 2);
  }

  /* Hint composer */

  :host([inline-position='center']) #hint-composer,
  :host([active][inline-position='center'][dragging]) #hint-composer {
    /* Centered with retracted width */
    inset-inline-start: calc(50% - var(--composer-retracted-width) / 2);
  }

  :host([active][inline-position='center']) #hint-composer {
    /* Centered with expanded width */
    inset-inline-start: calc(50% - var(--composer-expanded-width) / 2);
  }
`;
