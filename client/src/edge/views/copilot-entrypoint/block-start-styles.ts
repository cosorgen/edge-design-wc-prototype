import { css } from '@microsoft/fast-element';
import { spacingFrame } from '../../designSystem.js';

export default css`
  :host([block-position='start']) #composer {
    inset-block-start: calc(var(--viewport-top) - ${spacingFrame} / 2);
  }

  :host([block-position='start'][ntp]) #composer {
    inset-block-start: calc(var(--viewport-top) + var(--ntp-inset));
  }

  :host([block-position='start']:not([active])) #composer {
    inset-block-start: calc(0px - var(--composer-retracted-height));
  }
`;
