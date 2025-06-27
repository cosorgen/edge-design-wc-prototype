import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  cornerCircular,
  gapBetweenContentXxSmall,
  strokeWidthDefault,
  textStyleDefaultRegularFontFamily,
  textGlobalCaption1FontSize,
  foregroundCtrlNeutralPrimaryRest,
  backgroundCtrlSubtleHover,
  strokeCtrlOnOutlinePressed,
  backgroundCtrlSubtlePressed,
  backgroundCtrlSubtleRest,
  textGlobalCaption1LineHeight,
  strokeCtrlOnOutlineHover,
  textStyleDefaultRegularWeight,
} from '@phoenixui/themes/smtc-tokens.js';

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
    gap: ${gapBetweenContentXxSmall};
    background: ${backgroundCtrlSubtleRest};
    cursor: pointer;
    border-radius: ${cornerCircular};
    padding: 0;
    border: ${strokeWidthDefault} solid transparent;

    /* caption1 */
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalCaption1FontSize};
    line-height: ${textGlobalCaption1LineHeight};
    font-weight: ${textStyleDefaultRegularWeight};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  button:hover {
    border-color: ${strokeCtrlOnOutlineHover};
    background-color: ${backgroundCtrlSubtleHover};
  }

  button:hover:active,
  :host([pressed='true']) button {
    border-color: ${strokeCtrlOnOutlinePressed};
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
