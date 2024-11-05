import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  #composer[block-position='start'] {
    inset-block-start: calc(var(--viewport-top) - ${spacingFrame} / 2);
  }

  #composer[block-position='start'][ntp] {
    inset-block-start: calc(var(--viewport-top) + var(--ntp-inset));
  }

  :host(:not([active])) #composer[block-position='start'] {
    inset-block-start: calc(0px - var(--composer-retracted-height));
  }
`;
