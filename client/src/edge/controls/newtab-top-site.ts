import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  borderRadiusLarge,
  colorNeutralCardBackground,
  colorNeutralCardBackgroundHover,
  colorNeutralForeground1,
  colorNeutralStroke3,
  spacingHorizontalXS,
  spacingVerticalS,
  strokeWidthThin,
} from '@mai-ui/kumo-theme';

const template = html`
  <button>
    <slot></slot>
  </button>
`;

const smtcBackgroundCardOnImageRest = `var(--smtc-background-card-on-image-rest, ${colorNeutralCardBackground})`;
const smtcBackgroundCardOnImageHover = `var(--smtc-background-card-on-image-hover, ${colorNeutralCardBackgroundHover})`;
const smtcCornerTopSiteRest = `var(--smtc-corner-top-site-rest, ${borderRadiusLarge})`;
const smtcForegroundCardOnImageRest = `var(--smtc-foreground-card-on-image-rest, ${colorNeutralForeground1})`;
const smtcStrokeTopSiteRest = `var(--smtc-stroke-top-site-rest, ${colorNeutralStroke3})`;

const styles = css`
  :host {
    display: block;
    width: 64px;
    height: 64px;
  }

  button {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${spacingVerticalS};
    padding: ${spacingVerticalS} ${spacingHorizontalXS};
    background-color: ${smtcBackgroundCardOnImageRest};
    border-radius: ${smtcCornerTopSiteRest};
    border: ${strokeWidthThin} solid ${smtcStrokeTopSiteRest};
    cursor: pointer;
  }

  button:hover {
    background-color: ${smtcBackgroundCardOnImageHover};
  }

  slot:not([name])::slotted(*) {
    width: 24px;
    height: 24px;
    color: ${smtcForegroundCardOnImageRest};
  }
`;

@customElement({
  name: 'newtab-top-site',
  template,
  styles,
})
export class NewtabTopSite extends FASTElement {}
