import { css } from '@microsoft/fast-element';
import { ButtonStyles } from '@mai-ui/button';

export const styles = css`
  ${ButtonStyles}

  :host(:is([state--icon], :state(icon))) {
    padding:
      var(--smtc-padding-ctrl-texttop),
      var(--smtc-padding-ctrl-horizontal-icononly); /* padding needs to be on the host for border box to work */
  }

  :host(:is([state--icon], :state(icon)):is([state--small], :state(small))) {
    padding:
      var(--smtc-padding-ctrl-sm-texttop),
      var(--smtc-padding-ctrl-sm-horizontal-icononly); /* padding needs to be on the host for border box to work */
  }

  :host(:is([state--icon], :state(icon))) .content {
    box-sizing: border-box;
    padding: 0;
  }

  :host(:is([state--subtle], :state(subtle))[pressed='true']) {
    background-color: var(--smtc-background-ctrl-subtle-pressed);
  }
`;
