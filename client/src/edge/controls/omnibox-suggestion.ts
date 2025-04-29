import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  when,
} from '@microsoft/fast-element';
import './omnibox-icon.js';
import {
  backgroundCtrlBrandRest,
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtlePressed,
  cornerCtrlRest,
  foregroundCtrlNeutralSecondaryRest,
  gapBetweenContentSmall,
  textGlobalBody3Fontsize,
  textStyleDefaultRegularWeight,
} from '@phoenixui/themes/kumo-tokens.js';

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
    gap: ${gapBetweenContentSmall};
    height: 40px;
    overflow: hidden;
  }

  :host(:hover) {
    background-color: ${backgroundCtrlSubtleHover};
    cursor: pointer;
  }

  :host(:active) {
    background-color: ${backgroundCtrlSubtlePressed};
  }

  :host([selected]) {
    background-color: ${backgroundCtrlSubtlePressed};

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
    width: 3px;
    inset-block: 0;
    inset-inline-start: 0;
    background-color: ${backgroundCtrlBrandRest};
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
      border-radius: ${cornerCtrlRest};
    }
  }

  #title {
    /* Body1 */
    font-size: ${textGlobalBody3Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #subtitle2 {
    /* Body1 */
    font-size: ${textGlobalBody3Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${foregroundCtrlNeutralSecondaryRest};
  }
`;

@customElement({ name: 'omnibox-suggestion', template, styles })
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
