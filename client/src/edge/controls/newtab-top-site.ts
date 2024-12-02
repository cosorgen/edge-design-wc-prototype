import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  borderRadiusLarge,
  colorNeutralCardBackground,
  colorNeutralCardBackgroundHover,
  colorNeutralForeground1,
  spacingHorizontalXS,
  spacingVerticalS,
} from '@mai-ui/kumo-theme';

const template = html`
  <button>
    <slot></slot>
  </button>
`;

const smtcBackgroundCardOnImageRest = `var(--smtc-background-card-on-image-rest, ${colorNeutralCardBackground})`;
const smtcBackgroundCardOnImageHover = `var(--smtc-background-card-on-image-hover, ${colorNeutralCardBackgroundHover})`;
const smtcCornerControlRest = `var(--smtc-corner-control-rest, ${borderRadiusLarge})`;
const smtcForegroundCardOnImageRest = `var(--smtc-foreground-card-on-image-rest, ${colorNeutralForeground1})`;

const styles = css`
  :host {
    display: block;
    width: 56px;
    height: 56px;
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
    cursor: pointer;
    background-color: ${smtcBackgroundCardOnImageRest};
    border-radius: ${smtcCornerControlRest};
    border: none;
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
