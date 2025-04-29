import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  cornerCircular,
  gapBetweenContentXxsmall,
  strokewidthDefault,
  textStyleDefaultRegularFontfamily,
  textGlobalCaption1Fontsize,
  foregroundCtrlNeutralPrimaryRest,
  backgroundCtrlSubtleHover,
  strokeCtrlOnoutlinePressed,
  backgroundCtrlSubtlePressed,
  backgroundCtrlSubtleRest,
  textGlobalCaption1Lineheight,
  strokeCtrlOnoutlineHover,
  textStyleDefaultRegularWeight,
} from '@phoenixui/themes/kumo-tokens.js';

const imageIds = { signedIn: 'dog', inPrivate: 'inPrivate', guest: 'guest' };

const template = html<IdentityControl>`
  <button>
    <slot name="image">
      <img
        src="img/edge/profile_${(x) => imageIds[x.appearance]}.png"
        alt="Profile picture"
      />
    </slot>
    <slot>${(x) => (x.appearance === 'guest' ? 'Guest' : '')}</slot>
  </button>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXxsmall};
    background: ${backgroundCtrlSubtleRest};
    cursor: pointer;
    border-radius: ${cornerCircular};
    padding: 0;
    border: ${strokewidthDefault} solid transparent;

    /* caption1 */
    font-family: ${textStyleDefaultRegularFontfamily};
    font-size: ${textGlobalCaption1Fontsize};
    line-height: ${textGlobalCaption1Lineheight};
    font-weight: ${textStyleDefaultRegularWeight};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  button:hover {
    border-color: ${strokeCtrlOnoutlineHover};
    background-color: ${backgroundCtrlSubtleHover};
  }

  button:hover:active,
  :host([pressed='true']) button {
    border-color: ${strokeCtrlOnoutlinePressed};
    background-color: ${backgroundCtrlSubtlePressed};
  }

  slot[name='image'] img,
  slot[name='image']::slotted(*) {
    width: 24px;
    height: 24px;
    border-radius: ${cornerCircular};
  }
`;

@customElement({ name: 'identity-control', template, styles })
export class IdentityControl extends FASTElement {
  @attr appearance: 'signedIn' | 'inPrivate' | 'guest' = 'guest';
  @attr error: 'accountUnsup' | 'signIn' | 'signedOut' | 'custom' | null = null;
  @attr({ mode: 'boolean' }) notify = false;
}
