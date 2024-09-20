import {
  customElement,
  FASTElement,
  html,
  css,
  observable,
  repeat,
  attr,
  ValueConverter,
} from '@microsoft/fast-element';
import { Suggestion } from '#servicesautoSuggestService.js';

const NumberConverter: ValueConverter = {
  toView(value: number): string {
    return value.toString();
  },
  fromView(value: string): number {
    return parseInt(value);
  },
};

const template = html<OmniboxDropdown>`
  <div part="container">
    ${repeat(
      (x) => x.suggestions,
      html`<omnibox-suggestion
        type="${(x) => x.type}"
        title="${(x) => x.title}"
        value="${(x) => x.value}"
        subtitle="${(x) => x.subtitle}"
        subtitle2="${(x) => x.subtitle2}"
        attribution="${(x) => x.attribution}"
        entity-image="${(x) => x.entityImage}"
        ?selected="${(x, c) => c.index === c.parent['selected-index']}"
        @click="${(x, c) => c.parent.$emit('suggestion-click', x.value)}"
        @mousedown="${
          (x, c) => c.event.stopPropagation() /* prevent input blur */
        }"
      ></omnibox-suggestion>`,
      { positioning: true },
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
  @attr({ converter: NumberConverter }) 'selected-index' = -1;
}
