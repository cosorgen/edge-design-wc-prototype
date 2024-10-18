import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  colorNeutralCardBackground,
  spacingVerticalM,
  typographyStyles,
} from '@phoenixui/themes';

const template = html`<img /> <slot name="heading"></slot><slot></slot>`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalM};
    padding: ${spacingVerticalM};
    border-radius: 24px;
    background: ${colorNeutralCardBackground};
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    border: none;
    background-color: gray;
  }

  [name='heading'],
  [name='heading']::slotted(*) {
    margin: 0;
    font-family: ${typographyStyles.subtitle1.fontFamily};
    font-size: ${typographyStyles.subtitle1.fontSize};
    font-weight: ${typographyStyles.subtitle1.fontWeight};
    line-height: ${typographyStyles.subtitle1.lineHeight};
  }
`;

@customElement({ name: 'newtab-card', template, styles })
export class NewTabCard extends FASTElement {
  // Add properties and methods here
}
