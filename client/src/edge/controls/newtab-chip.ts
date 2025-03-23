import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorBrandBackground2Hover,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStroke3,
  spacingHorizontalM,
  spacingVerticalS,
  strokeWidthThin,
  typographyStyles,
} from '@edge-design/phoenix-theme';

const template = html`<slot></slot>`;

const styles = css`
  :host {
    display: inline-block;
    width: fit-content;
    padding: ${spacingVerticalS} ${spacingHorizontalM};
    border-radius: ${borderRadiusCircular};
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorNeutralStroke3};

    color: ${colorNeutralForeground1};
    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
  }

  :host(:hover) {
    cursor: pointer;
    background-color: ${colorBrandBackground2Hover};
  }
`;

@customElement({ name: 'newtab-chip', template, styles })
export class NewTabChip extends FASTElement {
  // Add properties and methods here
}
