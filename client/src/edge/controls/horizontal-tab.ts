import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusLarge,
  colorNeutralForeground1,
  colorSubtleBackgroundHover,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightRegular,
  lineHeightBase200,
  spacingHorizontalS,
  spacingHorizontalSNudge,
} from '@phoenixui/themes';

const template = html<HorizontalTab>`
  <button>
    <div id="favicon" part="favicon">
      <slot name="favicon">
        <svg width="16" height="16">
          <use href="img/edge/icons.svg#tab-desktop-new-page-16-regular"></use>
        </svg>
      </slot>
    </div>
    <div id="title" part="title">
      <slot>New tab</slot>
    </div>
  </button>
`;

const styles = css`
  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalS};
    padding-inline: ${spacingHorizontalS};
    padding-block: ${spacingHorizontalSNudge};
    width: 260px;
    min-width: 16px;
    height: 32px;
    color: ${colorNeutralForeground1};
    border-radius: ${borderRadiusLarge};
  }

  button:hover {
    background-color: ${colorSubtleBackgroundHover};
  }

  #title {
    display: flex;
    flex-direction: column;

    /* Caption1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
  }

  #favicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  }
`;

@customElement({
  name: 'horizontal-tab',
  template,
  styles,
})
export class HorizontalTab extends FASTElement {
  // ...
}
