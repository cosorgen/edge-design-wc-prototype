import { html } from '@microsoft/fast-element';
import '../omnibox-status.js';
import '../omnibox-input.js';
import '../omnibox-icon.js';
import '../omnibox-dropdown.js';
import '@phoenixui/web-components/button.js';
import { OmniboxControl } from './index.js';

export const template = html<OmniboxControl>`
  <div part="container">
    <div id="top-row">
      <div
        id="status"
        @click="${(x) => (!x.dropdownOpen ? x.handleInputClick() : null)}"
      >
        <omnibox-icon
          type="${(x) =>
            x.dropdownSelectedIndex >= 0
              ? x.suggestions[x.dropdownSelectedIndex].type
              : 'search'}"
          entity-image="${(x) =>
            x.dropdownSelectedIndex >= 0
              ? x.suggestions[x.dropdownSelectedIndex].entityImage
              : ''}"
        ></omnibox-icon>
        <omnibox-status value="${(x) => x.inputValue}"></omnibox-status>
      </div>
      <div id="rest-input" @click="${(x) => x.handleInputClick()}">
        ${(x) => x.truncatedInputValue()}
      </div>
      <omnibox-input
        value="${(x) => x.inputValue}"
        @click="${(x) => x.handleInputClick()}"
        @submit="${(x) => x.handleInputSubmit()}"
        @change="${(x, c) => x.handleInputChange(c.event as CustomEvent)}"
        @blur="${(x) => x.handleInputBlur()}"
        @arrow-up="${(x) => x.setDropdownSelection(-1)}"
        @arrow-down="${(x) => x.setDropdownSelection(1)}"
      ></omnibox-input>
      <div
        id="actions"
        @click="${(x) => (!x.dropdownOpen ? x.handleInputClick() : null)}"
      >
        <slot name="actions"></slot>
      </div>
    </div>
    <omnibox-dropdown
      selected-index="${(x) => x.dropdownSelectedIndex}"
      @suggestion-click="${(x, c) =>
        x.handleSuggestionClick(c.event as CustomEvent)}"
    ></omnibox-dropdown>
  </div>
`;
