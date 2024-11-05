import { css } from '@microsoft/fast-element';

export default css`
  /* Composer */

  /* Centered with retracted width */
  :host(:not([active])) #composer[inline-position='center'] {
    inset-inline-start: calc(50% - (var(--composer-retracted-width) / 2));
  }

  /* Centered with expanded width */
  #composer[inline-position='center'] {
    inset-inline-start: calc(50% - (var(--composer-expanded-width) / 2));
  }

  /* Hint target */

  /* Centered */
  :host:has(#composer[inline-position='center']) #hint-target {
    inset-inline-start: calc(50% - var(--hint-target-width) / 2);
  }

  /* Grabber */

  /* Centered with retracted width */
  :host:has(#composer[inline-position='center']) #grabber {
    inset-inline-start: calc(50% - var(--grabber-retracted-width) / 2);
  }

  /* Centered with expanded width */
  :host([hint]):has(#composer[inline-position='center']) #grabber,
  :host([active]):has(#composer[inline-position='center'][dragging]) #grabber {
    inset-inline-start: calc(50% - var(--grabber-expanded-width) / 2);
  }

  /* Hint composer */

  /* Centered with retracted width */
  :host:has(#composer[inline-position='center']) #hint-composer,
  :host([active]):has(#composer[inline-position='center'][dragging])
    #hint-composer {
    inset-inline-start: calc(50% - var(--composer-retracted-width) / 2);
  }

  /* Centered with expanded width */
  :host([active]):has(#composer[inline-position='center']) #hint-composer {
    inset-inline-start: calc(50% - var(--composer-expanded-width) / 2);
  }
`;
