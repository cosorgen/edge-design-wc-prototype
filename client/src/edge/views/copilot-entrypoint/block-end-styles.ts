import { css } from '@microsoft/fast-element';
import { spacingFrame } from '@mai-ui/phoenix-theme';

export default css`
  /* Composer */

  :host([block-position='end']) #composer {
    /* Align to bottom - 1/2 margin */
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} / 2
    );
  }

  :host([block-position='end'][ntp]) #composer,
  :host([block-position='end']:not([inline-position='center'])) #composer {
    /* Align to bottom - margin - ntp inset */
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  :host([block-position='end']:not([active])) #composer {
    /* all the way off window */
    inset-block-start: 100%;
  }

  /* Composer not centered */

  :host([block-position='end']:not([inline-position='center'])) #composer {
    /* Align to bottom - margin - ntp inset */
    inset-block-start: calc(
      100% - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  /* Hint target */

  :host([block-position='end']) #hint-target {
    /* align to bottom of window */
    inset-block-start: calc(100% - var(--hint-target-height));
  }

  /* Hint target not centered */

  :host([block-position='end']:not([inline-position='center'])) #hint-target {
    /* Align to bottom of window */
    inset-block-start: calc(100% - var(--hint-target-width));
  }

  /* Grabber */

  :host([block-position='end']) #grabber,
  :host([block-position='end']) #grabber-no-hint {
    /* Center in margin */
    inset-block-start: calc(
      100% - var(--grabber-height) / 2 - ${spacingFrame} / 2
    );
  }

  :host([block-position='end'][active]) #grabber {
    /* Center in top 10% of composer */
    inset-block-start: calc(100% - var(--composer-retracted-height) * 0.9);
  }

  :host([block-position='end'][active][ntp]) #grabber {
    /* Center in top 10% of composer + ntp offset */
    inset-block-start: calc(
      100% - var(--ntp-inset) - var(--composer-retracted-height) * 0.9
    );
  }

  :host([block-position='end'][hint]) #grabber,
  :host([block-position='end'][active][dragging]) #grabber {
    /* Center in top 25% of hint composer */
    inset-block-start: calc(
      100% - var(--grabber-height) / 2 - ${spacingFrame} - var(
          --composer-retracted-height
        ) * 0.25
    );
  }

  /* Grabber not centered */

  :host([block-position='end']:not([inline-position='center'])) #grabber,
  :host([block-position='end']:not([inline-position='center']))
    #grabber-no-hint {
    /* Alignt to bottom - margin */
    inset-block-start: calc(
      100% - var(--grabber-vertical-retracted-width) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  :host([block-position='end'][hint]:not([inline-position='center'])) #grabber,
  :host([block-position='end'][dragging]:not([inline-position='center']))
    #grabber,
  :host([block-position='end'][hint]:not([inline-position='center']))
    #grabber-no-hint,
  :host([block-position='end'][dragging]:not([inline-position='center']))
    #grabber-no-hint {
    /* Alignt to bottom - half expanded width - margin - ntp offset */
    inset-block-start: calc(
      100% - var(--grabber-vertical-expanded-width) -
        (var(--grabber-vertical-expanded-width) / 2) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  /* Hint composer */

  :host([block-position='end']) #hint-composer {
    /* Hide off screen */
    inset-block-start: calc(100% + var(--composer-retracted-height));
  }

  :host([block-position='end'][active]) #hint-composer {
    /* bottom in margin */
    inset-block-start: calc(
      100% - var(--composer-retracted-height) - ${spacingFrame} / 2
    );
  }

  :host([block-position='end'][hint]) #hint-composer,
  :host([block-position='end'][active][dragging]) #hint-composer,
  :host([block-position='end'][active][dragging][ntp]) #hint-composer {
    /* half peek */
    inset-block-start: calc(100% - var(--composer-retracted-height) / 2);
  }

  :host([block-position='end'][active][ntp]) #hint-composer {
    /* bottom over ntp */
    inset-block-start: calc(
      100% - var(--composer-retracted-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  /* Hint composer not centered */

  :host([block-position='end']:not([inline-position='center'])) #hint-composer,
  :host(
      [block-position='end'][active][dragging]:not([inline-position='center'])
    )
    #hint-composer {
    /* Align to bottom - margin - ntp offset */
    inset-block-start: calc(
      100% - var(--composer-retracted-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }
`;
