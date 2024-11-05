import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  #composer[inline-position='start'] {
    inset-inline-start: calc(${spacingFrame} / 2);
  }

  #composer[inline-position='start'][ntp] {
    inset-inline-start: calc(${spacingFrame} / 2 + var(--ntp-inset));
  }

  :host(:not([active])) #composer[inline-position='start'] {
    inset-inline-start: calc(0px - var(--composer-retracted-width));
  }
`;
