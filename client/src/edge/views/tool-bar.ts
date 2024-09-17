import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
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
        @submit="${(x, c) =>
          c.parent.handleOmniboxSubmit(c.event as CustomEvent)}"
        @change="${(x, c) =>
          c.parent.handleOmniboxChange(c.event as CustomEvent)}"
      >
        <div slot="suggestions">
          ${repeat(
            (x, c) => c.parent.ts.suggestions,
            html`
              <omnibox-suggestion
                title="${(x) => x.title}"
                value="${(x) => x.value}"
                type="${(x) => x.type}"
                entity-image="${(x) => x.entityImage}"
                subtitle2="${(x) => x.subtitle2}"
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

  handleOmniboxSubmit(e: CustomEvent) {
    // TODO: make sure e.detail is a valid URL
    this.ts.navigate(e.detail);
  }

  handleOmniboxChange(e: CustomEvent) {
    this.ts.generateSuggestions(e.detail);
  }
}
