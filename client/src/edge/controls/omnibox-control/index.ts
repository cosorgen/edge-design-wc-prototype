import { customElement } from '@microsoft/fast-element';

import { styles } from './styles.js';
import { template } from './template.js';
import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { Suggestion } from '#servicesautoSuggestService.js';
import { OmniboxDropdown } from '../omnibox-dropdown.js';

const mod = (n: number, m: number) => ((n % m) + m) % m; // handle negative indexes

/**
 * The Omnibox is a special control that has an inputfield, an autosuggest dropdown,
 * as well as some buttons. They're all wrapped togehter like one special text field.
 */

@customElement({ name: 'omnibox-control', template, styles })
export class OmniboxControl extends FASTElement {
  @attr({ mode: 'boolean' }) active = false;
  @attr initialValue = '';
  @observable dropdownOpen = false;
  @observable dropdownSelectedIndex = -1;
  @observable inputValue = '';
  @observable suggestions: Suggestion[] = [];
  dropdownComponent?: OmniboxDropdown | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.dropdownComponent = this.shadowRoot?.querySelector('omnibox-dropdown');
  }

  initialValueChanged() {
    if (this.inputValue !== this.initialValue) {
      // Got a new initial value, update the input value
      this.inputValue = this.initialValue;
    }
  }

  suggestionsChanged() {
    if (
      this.dropdownComponent &&
      this.dropdownComponent instanceof OmniboxDropdown
    ) {
      this.dropdownComponent.suggestions = this.suggestions;
    }
  }

  handleInputClick() {
    this.dropdownOpen = true;
  }

  handleInputSubmit() {
    this.dropdownOpen = false;
    this.dropdownSelectedIndex = -1;
  }

  handleInputChange(e: CustomEvent) {
    console.log(e);
    const newValue = e.detail;
    if (this.inputValue !== newValue) {
      console.log('handleInputChange', this.inputValue, newValue);
      this.inputValue = newValue;
      this.dropdownOpen = true;
      this.dropdownSelectedIndex = -1;
    }
  }

  handleInputBlur() {
    window.setTimeout(() => {
      this.dropdownOpen = false;
      this.dropdownSelectedIndex = -1;
      this.inputValue = this.initialValue;
    }, 100); // slight delay to allow for dropdown click
  }

  setDropdownSelection(step: number) {
    console.log('setDropdownSelection', step);
    if (this.dropdownOpen) {
      this.dropdownSelectedIndex = mod(
        this.dropdownSelectedIndex + step,
        this.suggestions.length,
      );
      this.inputValue = this.suggestions[this.dropdownSelectedIndex].value;
    }
  }

  handleSuggestionClick(e: CustomEvent) {
    console.log('handleSuggestionClick', e.detail);
    this.dropdownOpen = false;
    this.dropdownSelectedIndex = -1;
    this.inputValue = this.suggestions[e.detail].value;
    this.$emit('submit', this.suggestions[e.detail].value);
  }
}
