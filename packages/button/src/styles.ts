import { css } from '@microsoft/fast-element';
import { ButtonStyles } from '@mai-ui/button';

export const styles = css`
  ${ButtonStyles}

  :host(:is([state--icon], :state(icon))) {
    box-sizing: border-box !important;
    padding:
      var(--smtc-padding-ctrl-texttop),
      var(--smtc-padding-ctrl-horizontal-icononly); /* padding needs to be on the host for border box to work */
  }

  :host(:is([state--icon], :state(icon))) .content {
    box-sizing: border-box;
    padding: 0;
  }
`;
