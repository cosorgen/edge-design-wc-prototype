import {
  customElement,
  FASTElement,
  html,
  css,
  observable,
  repeat,
} from '@microsoft/fast-element';
import { Suggestion } from '#servicesautoSuggestService.js';

const template = html<OmniboxDropdown>`
  <div part="container">
    ${repeat(
      (x) => x.suggestions,
      html`<omnibox-suggestion
        type="${(x) => x.type}"
        title="${(x) => x.title}"
        subtitle="${(x) => x.subtitle}"
        subtitle2="${(x) => x.subtitle2}"
        attribution="${(x) => x.attribution}"
        entity-image="${(x) => x.entityImage}"
        ?selected="${(x, c) => c.index === c.parent.selectedIndex}"
      ></omnibox-suggestion>`,
    )}
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

@customElement({
  name: 'omnibox-dropdown',
  template,
  styles,
})
export class OmniboxDropdown extends FASTElement {
  @observable suggestions: Suggestion[] = [];
  @observable selectedIndex = -1;
}
