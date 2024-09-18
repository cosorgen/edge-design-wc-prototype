import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
  observable,
} from '@microsoft/fast-element';
import { spacingHorizontalS, spacingHorizontalXS } from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/omnibox-control.js';
import '../controls/omnibox-suggestion.js';
import '../../windows/controls/mica-material.js';
import { TabService } from '#servicestabService.js';
import { inject } from '@microsoft/fast-element/di.js';

const template = html<Toolbar>`
  <div class="group">
    <phx-button appearance="subtle" icon-only disabled>
      <svg>
        <use href="img/edge/icons.svg#back-20-regular" />
      </svg>
    </phx-button>
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#arrow-clockwise-20-regular" />
      </svg>
    </phx-button>
  </div>
  ${repeat(
    (x) => x.ts.tabs,
    html`
      <omnibox-control
        ?active="${(x) => x.active}"
        initialValue="${(x) => x.url}"
        ?expanded="${(x, c) => c.parent.omniboxExpanded && x.active}"
        @submit="${(x, c) =>
          c.parent.handleOmniboxSubmit(c.event as CustomEvent)}"
        @change="${(x, c) =>
          c.parent.handleOmniboxChange(c.event as CustomEvent)}"
        @input-click="${(x, c) => (c.parent.omniboxExpanded = true)}"
        @blur="${(x, c) => c.parent.collapseOmnibox()}"
      >
        <div slot="suggestions">
          ${repeat(
            (x, c) => c.parent.ts.suggestions,
            html`
              <omnibox-suggestion
                title="${(x) => x.title}"
                type="${(x) => x.type}"
                entity-image="${(x) => x.entityImage}"
                subtitle2="${(x) => x.subtitle2}"
                @click="${(x, c) => {
                  c.event.preventDefault();
                  c.parentContext.parent.handleOmniboxSubmit({
                    ...c.event,
                    detail: x.value,
                  } as CustomEvent);
                }}"
                role="button"
                z-index="0"
              ></omnibox-suggestion>
            `,
          )}
        </div>
      </omnibox-control>
    `,
  )}
  <div class="group">
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#star-list-horizontal-20-regular" />
      </svg>
    </phx-button>
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#more-horizontal-20-regular" />
      </svg>
    </phx-button>
    <phx-button id="copilot" appearance="subtle" icon-only>
      <img src="img/edge/copilot-icon.svg" />
    </phx-button>
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalS};
    user-select: none;
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  #copilot::part(content) {
    width: 24px;
    height: 24px;
  }
`;

@customElement({
  name: 'tool-bar',
  template,
  styles,
})
export class Toolbar extends FASTElement {
  @inject(TabService) ts!: TabService;
  @observable omniboxExpanded = false;
  omniboxValue = '';

  handleOmniboxSubmit(e: CustomEvent) {
    this.collapseOmnibox();
    this.ts.navigate(e.detail);
  }

  handleOmniboxChange(e: CustomEvent) {
    if (e.detail !== this.omniboxValue) {
      this.expandOmnibox();
      if (!this.omniboxExpanded) this.omniboxExpanded = true;
      this.ts.generateSuggestions(e.detail);
    }
  }

  expandOmnibox() {
    this.omniboxExpanded = true;
  }

  collapseOmnibox() {
    // Delay is needed to capture the click event on the suggestion.
    window.setTimeout(() => {
      this.omniboxExpanded = false;
      this.ts.generateSuggestions(''); // Clear suggestions when the omnibox is collapsed.
    }, 100);
  }
}
