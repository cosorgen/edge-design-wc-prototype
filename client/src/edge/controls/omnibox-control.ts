import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorNeutralBackground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalXS,
} from '@phoenixui/themes';
import './omnibox-status.js';

const template = html<OmniboxControl>`
  <omnibox-status icon-only></omnibox-status>
  <input part="input" type="text" />
`;
const styles = css`
  :host {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${spacingVerticalXS} ${spacingHorizontalXXS};
    gap: ${spacingHorizontalXS};
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusCircular};
  }

  input {
    flex: 1;
    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    padding: 0;
    background-color: transparent;
    outline: none;
    border: none;
  }
`;

@customElement({ name: 'omnibox-control', template, styles })
export class OmniboxControl extends FASTElement {}
