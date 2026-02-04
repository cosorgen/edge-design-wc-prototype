import { customElement } from '@microsoft/fast-element';

import { styles } from './styles.js';
import { template } from './template.js';
import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { Suggestion } from '#servicesautoSuggestService.js';
import { OmniboxDropdown } from '../omnibox-dropdown.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgePermissionsService from '#servicespermissionsService.js';

const mod = (n: number, m: number) => ((n % m) + m) % m; // handle negative indexes

/**
 * The Omnibox is a special control that has an inputfield, an autosuggest dropdown,
 * as well as some buttons. They're all wrapped togehter like one special text field.
 */

@customElement({ name: 'omnibox-control', template, styles })
export class OmniboxControl extends FASTElement {
  @attr({ mode: 'boolean', attribute: 'truncate-url' }) truncateURL = false;
  @attr({ mode: 'boolean', attribute: 'dropdown-open' }) dropdownOpen = false;
  @attr initialValue = '';
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable dropdownSelectedIndex = -1;
  @observable inputValue = '';
  @observable suggestions: Suggestion[] = [];
  @observable status = '';
  dropdownComponent?: OmniboxDropdown | null = null;
  inputComponent?: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.dropdownComponent = this.shadowRoot?.querySelector('omnibox-dropdown');
    this.inputComponent = this.shadowRoot?.querySelector('omnibox-input');
  }

  initialValueChanged() {
    if (this.initialValue === 'edge://newtab') {
      // Don't display the address of the new tab page
      this.initialValue = '';
      if (this.inputComponent) this.inputComponent.focus();
    }

    if (this.inputValue !== this.initialValue) {
      // Got a new initial value, update the input value
      this.inputValue = this.initialValue;
      this.status = this.initialValue;
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
    setTimeout(() => {
      if (this.inputComponent) this.inputComponent.focus();
    }, 50); // wait for render incase input is display: none
    this.dropdownOpen = true;
  }

  handleInputSubmit() {
    (this.shadowRoot?.querySelector('omnibox-input') as HTMLElement).blur();
  }

  handleInputChange(e: CustomEvent) {
    const newValue = e.detail;
    if (this.inputValue !== newValue) {
      this.inputValue = newValue;
      this.status = newValue;
      if (!this.dropdownOpen) this.dropdownOpen = true;
      this.dropdownSelectedIndex = -1;
    }
  }

  handleInputBlur() {
    this.dropdownOpen = false;
    this.dropdownSelectedIndex = -1; // Reset to initial value
    this.inputValue = this.initialValue; // Reset to initial value
    this.status = this.initialValue; // Reset to initial value
  }

  setDropdownSelection(step: number) {
    if (this.dropdownOpen) {
      this.dropdownSelectedIndex = mod(
        this.dropdownSelectedIndex + step,
        this.suggestions.length,
      );
      this.inputValue = this.suggestions[this.dropdownSelectedIndex].title;
      this.status = this.suggestions[this.dropdownSelectedIndex].title;
    }
  }

  handleSuggestionClick(e: CustomEvent) {
    (this.shadowRoot?.querySelector('omnibox-input') as HTMLElement).blur();
    this.inputValue = e.detail;
    this.status = e.detail;
    this.$emit('submit', e.detail);
  }

  truncatedInputValue() {
    if (
      this.inputValue &&
      this.inputValue !== 'edge://newtab' &&
      !this.dropdownOpen &&
      this.truncateURL
    ) {
      const url = new URL(this.inputValue);
      return url.hostname;
    }
    return '';
  }
}
