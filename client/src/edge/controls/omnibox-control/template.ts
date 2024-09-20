import { html } from '@microsoft/fast-element';
import '../omnibox-status.js';
import '../omnibox-input.js';
import '../omnibox-icon.js';
import '../omnibox-dropdown.js';
import '@phoenixui/web-components/button.js';

export const template = html`
  <div part="container" ?dropdown-open="${(x) => x.dropdownOpen}">
    <div id="top-row">
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
      <omnibox-input
        value="${(x) => x.inputValue}"
        @click="${(x) => x.handleInputClick()}"
        @submit="${(x) => x.handleInputSubmit()}"
        @change="${(x, c) => x.handleInputChange(c.event as CustomEvent)}"
        @blur="${(x) => x.handleInputBlur()}"
        @arrow-up="${(x) => x.setDropdownSelection(-1)}"
        @arrow-down="${(x) => x.setDropdownSelection(1)}"
      ></omnibox-input>
      <div id="actions">
        <phx-button size="small" appearance="subtle" shape="circular" icon-only>
          <svg>
            <use href="img/edge/icons.svg#star-add-20-regular" />
          </svg>
        </phx-button>
      </div>
    </div>
    <omnibox-dropdown
      selected-index="${(x) => x.dropdownSelectedIndex}"
      @suggestion-click="${(x, c) =>
        x.handleSuggestionClick(c.event as CustomEvent)}"
    ></omnibox-dropdown>
  </div>
`;
