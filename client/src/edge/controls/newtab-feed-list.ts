import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  colorNeutralCardBackground,
  colorNeutralCardBackgroundHover,
  colorNeutralForegroundHint,
  spacingHorizontalXS,
  spacingVerticalS,
  typographyStyles,
  spacingVerticalL,
  spacingVerticalM,
} from '@edge-design/phoenix-theme';

const template = html` <h2>Top stories for you</h2>
  <div id="list">
    <slot></slot>
  </div>`;

const styles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalL};
    padding: ${spacingVerticalL};
    border-radius: 24px;
    background: ${colorNeutralCardBackground};
    max-width: 512px;
  }

  h2 {
    margin: 0;
    font-family: 'Lora', sans-serif;
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
  }

  #list {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalM};
  }
`;

@customElement({ name: 'newtab-feed-list', template, styles })
export class NewtabFeedList extends FASTElement {}

const template2 = html` <div id="content">
    <div id="by-line">
      <slot name="publisher-icon"></slot>
      •
      <slot name="time"></slot>
    </div>
    <div id="heading"><slot></slot></div>
  </div>
  <slot name="hero"></slot>`;

const styles2 = css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: ${spacingVerticalS};
    padding: ${spacingVerticalS};
    border-radius: 16px;
    max-height: 104px;
    overflow: hidden;
  }

  :host(:hover) {
    background: ${colorNeutralCardBackgroundHover};
    cursor: pointer;
  }

  [name='hero']::slotted(img),
  img {
    width: 88px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 8px;
  }

  #by-line {
    display: flex;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  [name='publisher-icon']::slotted(img) {
    height: 16px;
  }

  [name='time']::slotted(*) {
    color: ${colorNeutralForegroundHint};
  }

  #content {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalS};
  }

  #heading {
    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: ${typographyStyles.body1Strong.lineHeight};

    overflow: hidden;
    text-wrap: pretty;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

@customElement({
  name: 'newtab-feed-list-item',
  template: template2,
  styles: styles2,
})
export class NewtabFeedCardItem extends FASTElement {}
