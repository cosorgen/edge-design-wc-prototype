import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  /* Composer */

  #composer[block-position='end'] {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - (${spacingFrame} / 2)
    );
  }

  #composer[block-position='end'][ntp] {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  :host(:not([active])) #composer[block-position='end'] {
    inset-block-start: 100%;
  }

  /* Hint target */

  :host:has(#composer[block-position='end']) #hint-target {
    inset-block-start: calc(100% - var(--hint-target-height));
  }

  /* Grabber */

  :host:has(#composer[block-position='end']) #grabber {
    inset-block-start: calc(
      100% - (var(--grabber-height) / 2) - (${spacingFrame} / 2)
    );
  }

  :host([active]):has(#composer[block-position='end']) #grabber {
    inset-block-start: calc(100% - var(--composer-expanded-height));
  }

  :host([active]):has(#composer[block-position='end'][ntp]) #grabber {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - var(--ntp-inset)
    );
  }

  :host([hint]):has(#composer[block-position='end']) #grabber,
  :host([hint]):has(#composer[block-position='end'][ntp]) #grabber {
    inset-block-start: calc(
      100% - (var(--grabber-height) / 2) - (${spacingFrame} / 2) -
        (var(--composer-retracted-height) / 4)
    );
  }

  /* Hint composer */

  :host:has(#composer[block-position='end']) #hint-composer {
    inset-block-start: 100%;
  }

  :host([active]):has(#composer[block-position='end']) #hint-composer {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - (${spacingFrame} / 2)
    );
  }

  :host([active]):has(#composer[block-position='end'][ntp]) #hint-composer {
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  :host([hint]):has(#composer[block-position='end']) #hint-composer,
  :host([hint][active]):has(#composer[block-position='end']) #hint-composer {
    inset-block-start: calc(100% - var(--composer-retracted-height) / 2);
  }
`;
