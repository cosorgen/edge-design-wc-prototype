import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralCardBackground,
  colorNeutralCardBackgroundHover,
  colorNeutralForeground2,
  colorNeutralForegroundHint,
  spacingHorizontalXS,
  spacingVerticalM,
  spacingVerticalS,
  typographyStyles,
} from '@mai-ui/phoenix-theme';

const template = html`<slot name="hero"></slot>
  <div id="by-line">
    <slot name="publisher-icon"></slot>
    <slot name="publisher"></slot>
    •
    <slot name="time"></slot>
  </div>
  <div id="content">
    <slot name="heading"></slot>
    <span id="body"><slot></slot></span>
  </div>`;

const styles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalM};
    padding: ${spacingVerticalM};
    border-radius: 24px;
    background: ${colorNeutralCardBackground};
    max-width: 512px;
  }

  :host(:hover) {
    background: ${colorNeutralCardBackgroundHover};
    cursor: pointer;
  }

  [name='hero']::slotted(img),
  img {
    width: 100%;
    border-radius: 16px;
  }

  [name='heading'],
  [name='heading']::slotted(*) {
    margin: 0;
    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: ${typographyStyles.body1Strong.lineHeight};
  }

  #by-line {
    display: flex;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  [name='publisher']::slotted(*) {
    font-family: ${typographyStyles.caption1Strong.fontFamily};
    font-size: ${typographyStyles.caption1Strong.fontSize};
    font-weight: ${typographyStyles.caption1Strong.fontWeight};
    line-height: ${typographyStyles.caption1Strong.lineHeight};
  }

  [name='publisher-icon']::slotted(img) {
    width: 16px;
    border-radius: ${borderRadiusMedium};
  }

  [name='time']::slotted(*) {
    color: ${colorNeutralForegroundHint};
  }

  #content {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalS};
  }

  #body {
    color: ${colorNeutralForeground2};
  }
`;

@customElement({ name: 'newtab-feed-card', template, styles })
export class NewtabFeedCard extends FASTElement {}
