import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  colorNeutralCardBackground,
  spacingVerticalM,
  spacingVerticalS,
  typographyStyles,
} from '@phoenixui/themes';

const template = html`<slot name="hero"></slot>
  <div id="content"><slot name="heading"></slot><slot></slot></div>`;

const styles = css`
  :host {
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

  #content {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalS};
  }
`;

@customElement({ name: 'newtab-feed-card', template, styles })
export class NewtabFeedCard extends FASTElement {}
