import { css } from '@microsoft/fast-element';

export default css`
  #composer[block-position='center'] {
    inset-block-start: calc(
      var(--viewport-top) + (var(--viewport-height) / 2) -
        (var(--composer-expanded-height) / 2)
    );
  }
`;
