import { css } from '@microsoft/fast-element';

export default css`
  /* Composer */
  #composer[inline-position='center'] {
    inset-inline-start: calc(50% - (var(--composer-expanded-width) / 2));
  }

  #composer[inline-position='center'][ntp] {
    inset-inline-start: calc(50% - (var(--composer-expanded-width) / 2));
  }

  :host(:not([active])) #composer[inline-position='center'] {
    inset-inline-start: calc(50% - (var(--composer-retracted-width) / 2));
  }

  /* Hint target */

  :host:has(#composer[inline-position='center']) #hint-target {
    inset-inline-start: calc(50% - var(--hint-target-width) / 2);
  }

  /* Grabber */

  :host:has(#composer[inline-position='center']) #grabber {
    inset-inline-start: calc(50% - var(--grabber-retracted-width) / 2);
  }

  :host([hint]):has(#composer[inline-position='center']) #grabber {
    inset-inline-start: calc(50% - var(--grabber-expanded-width) / 2);
  }

  /* Hint composer */

  :host:has(#composer[inline-position='center']) #hint-composer {
    inset-inline-start: calc(50% - var(--composer-retracted-width) / 2);
  }

  :host([active]):has(#composer[inline-position='center']) #hint-composer {
    inset-inline-start: calc(50% - var(--composer-expanded-width) / 2);
  }

  :host([hint]):has(#composer[inline-position='center']) #hint-composer {
    inset-inline-start: calc(50% - var(--composer-retracted-width) / 2);
  }
`;
