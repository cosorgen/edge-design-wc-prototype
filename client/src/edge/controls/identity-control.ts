import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorNeutralForeground1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightRegular,
  lineHeightBase200,
  spacingHorizontalXS,
  strokeWidthThin,
} from '@edge-design/phoenix-theme';

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
    gap: ${spacingHorizontalXS};
    background: none;
    cursor: pointer;
    border-radius: ${borderRadiusCircular};
    padding: 0;
    border: ${strokeWidthThin} solid transparent;

    /* caption1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
  }

  button:hover {
    border: ${strokeWidthThin} solid ${colorNeutralStroke1Hover};
    background-color: ${colorSubtleBackgroundHover};
  }

  button:hover:active {
    border: ${strokeWidthThin} solid ${colorNeutralStroke1Pressed};
    background-color: ${colorSubtleBackgroundPressed};
  }

  slot[name='image'] img,
  slot[name='image']::slotted(*) {
    width: 24px;
    height: 24px;
    border-radius: ${borderRadiusCircular};
  }
`;

@customElement({ name: 'identity-control', template, styles })
export class IdentityControl extends FASTElement {
  @attr appearance: 'signedIn' | 'inPrivate' | 'guest' = 'guest';
  @attr error: 'accountUnsup' | 'signIn' | 'signedOut' | 'custom' | null = null;
  @attr({ mode: 'boolean' }) notify = false;
}
