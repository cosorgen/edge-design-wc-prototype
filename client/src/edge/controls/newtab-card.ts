import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  colorBrandForegroundLink,
  colorNeutralCardBackground,
  colorNeutralForegroundHint,
  spacingHorizontalL,
  spacingVerticalM,
  spacingVerticalS,
  typographyStyles,
} from '@mai-ui/phoenix-theme';

const template = html`<slot name="hero"></slot>
  <div id="content"><slot name="heading"></slot><slot></slot></div>`;

const styles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalM};
    padding: ${spacingVerticalM};
    border-radius: 24px;
    background: ${colorNeutralCardBackground};
    max-width: 256px;
  }

  [name='hero']::slotted(img),
  img {
    width: 100%;
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

  #content {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalS};
  }
`;

@customElement({ name: 'newtab-card', template, styles })
export class NewTabCard extends FASTElement {}

const template2 = html`<span><slot></slot></span>
  <svg><use href="img/edge/icons.svg#chevron-right-20-regular"></use></svg>`;

const styles2 = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalL};
    justify-content: space-between;

    color: ${colorNeutralForegroundHint};
    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
  }

  :host(:hover) {
    color: ${colorBrandForegroundLink};
    cursor: pointer;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    flex: 1;
    min-width: 0px;
  }
`;

@customElement({
  name: 'newtab-card-item',
  template: template2,
  styles: styles2,
})
export class NewTabCardItem extends FASTElement {}
