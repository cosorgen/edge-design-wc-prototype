import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorNeutralForeground2,
  colorNeutralStroke2,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightRegular,
  lineHeightBase200,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalXXS,
  strokeWidthThin,
} from '@phoenixui/themes';

const template = html<OmniboxStatus>`
  <button>
    <slot>
      <svg>
        <use href="img/edge/icons.svg#lock-closed-20-regular" />
      </svg>
    </slot>
    <slot name="label">Secure</slot>
  </button>
  <div></div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: ${borderRadiusCircular};
    padding: ${spacingVerticalXXS} ${spacingHorizontalS};
    /* caption1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    color: ${colorNeutralForeground2};

    &:hover {
      background: ${colorSubtleBackgroundHover};
    }
    &:active {
      background: ${colorSubtleBackgroundPressed};
    }
  }

  :host([selected]) button {
    background: ${colorSubtleBackgroundSelected};
  }

  div {
    width: ${strokeWidthThin};
    height: 100%;
    background: ${colorNeutralStroke2};
    margin: ${spacingHorizontalXS};
  }

  slot::slotted(*),
  svg {
    width: 20px;
    height: 20px;
  }

  :host([icon-only]) div,
  :host([icon-only]) [name='label'] {
    display: none;
  }

  :host(:hover) div,
  :host(:active) div,
  button:focus-visible + div,
  :host([selected]) div {
    display: none;
  }
`;

@customElement({
  name: 'omnibox-status',
  template,
  styles,
})
export class OmniboxStatus extends FASTElement {
  @attr({ mode: 'boolean' }) 'icon-only' = false;
  @attr({ mode: 'boolean' }) selected = false;
}
