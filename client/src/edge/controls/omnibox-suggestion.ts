import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  when,
} from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorBrandStroke,
  colorNeutralForegroundHint,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected,
  fontSizeBase300,
  fontWeightRegular,
  spacingHorizontalM,
  spacingVerticalS,
  strokeWidthThickest,
} from '@mai-ui/phoenix-theme';
import './omnibox-icon.js';

const template = html<OmniboxSuggestion>` <div id="start">
    <div id="indicator"></div>
    <omnibox-icon
      type="${(x) => x.type}"
      entity-image="${(x) => x.entityImage}"
    ></omnibox-icon>
    <div id="title">${(x) => x.title}</div>
    ${when(
      (x) => x.subtitle2 && x.subtitle2 !== '',
      html`<div id="subtitle2">&nbsp;-&nbsp;${(x) => x.subtitle2}</div>`,
    )}
  </div>
  <div id="end"></div>`;

const styles = css`
  :host {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalM};
    height: 40px;
    border-radius: ${borderRadiusMedium};
    overflow: hidden;
  }

  :host(:hover) {
    background-color: ${colorSubtleBackgroundHover};
    cursor: pointer;
  }

  :host(:active) {
    background-color: ${colorSubtleBackgroundPressed};
  }

  :host([selected]) {
    background-color: ${colorSubtleBackgroundSelected};

    #indicator {
      display: block;
    }
  }

  #start {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    min-width: 16px;
  }

  #indicator {
    display: none;
    position: absolute;
    width: ${strokeWidthThickest};
    inset-block: ${spacingVerticalS};
    inset-inline-start: 0;
    background-color: ${colorBrandStroke};
    border-radius: ${borderRadiusCircular};
  }

  #icon {
    width: 48px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
    }

    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: ${borderRadiusMedium};
    }
  }

  #title {
    /* Body1 */
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #subtitle2 {
    /* Body1 */
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${colorNeutralForegroundHint};
  }
`;

@customElement({
  name: 'omnibox-suggestion',
  template,
  styles,
})
export class OmniboxSuggestion extends FASTElement {
  @attr title = '';
  @attr value = '';
  @attr type: 'search' | 'entity' | 'history' | 'site' | 'label' = 'search';
  @attr({ attribute: 'entity-image' }) entityImage = '';
  @attr subtitle = '';
  @attr subtitle2 = '';
  @attr attribution = '';
  @attr({ mode: 'boolean' }) selected = false;
}
