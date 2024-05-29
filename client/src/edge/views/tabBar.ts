import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  spacingHorizontalXS,
  spacingVerticalXXS,
  spacingHorizontalS,
  spacingVerticalSNudge,
  shadow2,
  spacingHorizontalXXS,
  spacingHorizontalSNudge,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/identityControl.js';
import '../controls/horizontal-tab.js';
import '../../windows/controls/mica-material.js';
import { Tab, TabService } from '#services/tabService.js';

const template = html<TabBar>`
  <mica-material appearance="tabBar"></mica-material>
  <div id="shadow"></div>
  <div id="content">
    <div id="left-aligned-container">
      <div class="group">
        <identity-control></identity-control>
      </div>
      <div class="group">
        <phx-button appearance="subtle" icon-only>
          <svg>
            <use href="img/edge/icons.svg#layer-diagonal-20-regular"></use>
          </svg>
        </phx-button>
        <phx-button appearance="subtle" icon-only>
          <svg>
            <use
              href="img/edge/icons.svg#tab-position-horizontal-20-regular"
            ></use>
          </svg>
        </phx-button>
      </div>
      <div id="tabs">
        ${repeat(
          (x) => x.ts.tabs,
          html<Tab>` <horizontal-tab
            ?active="${(x) => x.active}"
            @activate="${(x, c) => c.parent.activateTab(x.id)}"
            @close="${(x, c) => c.parent.closeTab(x.id)}"
          >
            ${(x) => x.title}
            <img slot="favicon" src="${(x) => x.favicon}" />
          </horizontal-tab>`,
        )}
      </div>
      <phx-button appearance="subtle" icon-only id="add">
        <svg>
          <use href="img/edge/icons.svg#add-20-regular"></use>
        </svg>
      </phx-button>
    </div>
    <div class="group" id="caption-controls">
      <phx-button size="large" appearance="subtle" shape="square" icon-only>
        <svg>
          <use href="img/edge/icons.svg#minimize-16-regular" x="4" y="4"></use>
        </svg>
      </phx-button>
      <phx-button size="large" appearance="subtle" shape="square" icon-only>
        <svg>
          <use href="img/edge/icons.svg#maximize-16-regular" x="4" y="4"></use>
        </svg>
      </phx-button>
      <phx-button size="large" appearance="subtle" shape="square" icon-only>
        <svg>
          <use href="img/edge/icons.svg#dismiss-16-regular" x="4" y="4"></use>
        </svg>
      </phx-button>
    </div>
  </div>
`;

const styles = css`
  :host {
    position: relative;
    display: block;
    overflow: hidden;
  }

  #left-aligned-container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    gap: ${spacingHorizontalS};
    padding-inline: ${spacingHorizontalXS};
    padding-block-start: ${spacingVerticalSNudge};
    padding-block-end: ${spacingVerticalXXS};
  }

  #content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  #shadow {
    position: absolute;
    inset-inline: 0;
    bottom: -2px;
    height: 2px;
    box-shadow: ${shadow2};
  }

  #tabs {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalXXS};
  }

  #add {
    margin-inline-start: calc(0px - ${spacingHorizontalSNudge});
  }

  #caption-controls phx-button:hover {
  }
`;

@customElement({
  name: 'tab-bar',
  template,
  styles,
})
export class TabBar extends FASTElement {
  @inject(TabService) ts!: TabService;

  connectedCallback() {
    super.connectedCallback();
    this.positionMicaLayers();
  }

  positionMicaLayers() {
    const imgEl = this.shadowRoot!.querySelector(
      'mica-material',
    ) as HTMLElement;
    const { top, left } = imgEl.getBoundingClientRect();
    imgEl.style.top = `-${top}px`;
    imgEl.style.left = `-${left}px`;
  }

  activateTab(tabId: string) {
    this.ts.activateTab(tabId);
  }

  closeTab(tabId: string) {
    this.ts.removeTab(tabId);
  }
}
