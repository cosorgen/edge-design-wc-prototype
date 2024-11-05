import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  #composer[inline-position='end'] {
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${spacingFrame} / 2
    );
  }

  #composer[inline-position='end'][ntp] {
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${spacingFrame} / 2 - var(
          --ntp-inset
        )
    );
  }

  :host(:not([active])) #composer[inline-position='end'] {
    inset-inline-start: calc(100% + var(--composer-retracted-width));
  }
`;
