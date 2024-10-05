import EdgeWindowService from '#servicesedgeWindowService.js';
import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  borderRadiusLayerBase,
  shadow2,
  spacingHorizontalXXL,
  spacingVerticalXXL,
} from '@phoenixui/themes';
import '../controls/sidepane-header.js';
import '../controls/copilot-composer.js';

const template = html`
  <sidepane-header>Copilot</sidepane-header>
  <div id="content">
    <img src="img/edge/copilot-sidepane.png" />
    <copilot-composer placeholder="Message Copilot">
      <phx-button appearance="subtle" size="large" icon-only slot="start">
        <svg>
          <use x="2px" y="2px" href="img/edge/icons.svg#history-20-regular" />
        </svg>
      </phx-button>
      <phx-button appearance="subtle" size="large" icon-only slot="end">
        <svg>
          <use x="2px" y="2px" href="img/edge/icons.svg#mic-new-20-regular" />
        </svg>
      </phx-button>
    </copilot-composer>
  </div>
`;

const styles = css`
  :host {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 376px;
    background: linear-gradient(
      180deg,
      #fcf9f6 0%,
      #fcf9f6 60%,
      #fbebe0 99%,
      #fde5cd 100%
    );
    border-radius: ${borderRadiusLayerBase};
    box-shadow: ${shadow2};
    overflow: hidden;
  }

  #content {
    flex: 1;
    position: relative;
    padding: ${spacingVerticalXXL};
    min-height: 0px;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  copilot-composer {
    position: absolute;
    bottom: ${spacingVerticalXXL};
    inset-inline: ${spacingHorizontalXXL};
  }
`;

@customElement({
  name: 'copilot-sidepane',
  template,
  styles,
})
export class CopilotSidepane extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
  }

  addEventListeners() {
    this.addEventListener('close', () => {
      this.ews.sidepaneAppId = null;
    });
  }
}
