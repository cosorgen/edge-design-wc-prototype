import { paddingWindowDefault } from '@edge-design/kumo-theme/tokens.js';
import { css } from '@microsoft/fast-element';

export default css`
  /* Composer */

  :host([inline-position='end']) #composer {
    /* Start half in the margin */
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${paddingWindowDefault} / 2
    );
  }

  :host([inline-position='end'][ntp]) #composer {
    /* Start over ntp page */
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${paddingWindowDefault} /
        2 - var(--ntp-inset)
    );
  }

  :host([inline-position='end']:not([active])) #composer {
    /* All the way off screen */
    inset-inline-start: calc(100% + var(--composer-retracted-width));
  }

  /* Hint target */

  :host([inline-position='end']) #hint-target {
    /* Align to end */
    inset-inline-start: calc(100% - var(--hint-target-height));
  }

  /* Grabber */

  :host([inline-position='end']) #grabber,
  :host([inline-position='end']) #grabber-no-hint {
    /* Start centered in margin */
    inset-inline-start: calc(
      100% - var(--grabber-height) / 2 - ${paddingWindowDefault} / 2
    );
  }

  :host([inline-position='end'][active]) #grabber {
    /* Offset composer expanded width + margin */
    inset-inline-start: calc(
      100% - var(--composer-expanded-width) - ${paddingWindowDefault}
    );
  }

  :host([inline-position='end'][hint]) #grabber,
  :host([inline-position='end'][dragging]) #grabber {
    /* Offset 10% of composer retracted width */
    inset-inline-start: calc(100% - var(--composer-retracted-width) * 0.1);
  }

  /* Hint composer */

  :host([inline-position='end']) #hint-composer {
    /* Start all the way off window */
    inset-inline-start: calc(100% + var(--composer-retracted-width));
  }

  :host([inline-position='end'][active]) #hint-composer {
    /* half in margin */
    inset-inline-start: calc(
      100% - var(--composer-retracted-width) - ${paddingWindowDefault} / 2
    );
  }

  :host([inline-position='end'][active][ntp]) #hint-composer {
    /* over ntp */
    inset-inline-start: calc(
      100% - var(--composer-retracted-width) -
        ${paddingWindowDefault} - var(--ntp-inset)
    );
  }

  :host([inline-position='end'][hint]) #hint-composer,
  :host([inline-position='end'][active][dragging]) #hint-composer {
    /* Peek 25% of composer size */
    inset-inline-start: calc(100% - var(--composer-retracted-width) * 0.25);
  }
`;
