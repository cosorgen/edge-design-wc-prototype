import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '../../windows/controls/mica-material.js';
import '../controls/copilot-composer.js';
import '@phoenixui/web-components/button.js';
import '../controls/newtab-card.js';
import '../controls/newtab-chip.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import {
  colorBrandForegroundLink,
  colorBrandForegroundLinkHover,
  colorNeutralForegroundHint,
  spacingHorizontalL,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingVerticalXXL,
  typographyStyles,
} from '@phoenixui/themes';

const template = html<EdgeNewTab>`
  <mica-material
    top="${(x) => x.ws.getWindowById(x.ews.id)?.yPos}"
    left="${(x) => x.ws.getWindowById(x.ews.id)?.xPos}"
  ></mica-material>
  <div id="content">
    <copilot-composer placeholder="Search or chat with Copilot">
      <phx-button appearance="subtle" size="large" icon-only slot="end">
        <svg>
          <use x="2" y="2" href="img/edge/icons.svg#add-20-regular" />
        </svg>
      </phx-button>
      <phx-button appearance="subtle" size="large" icon-only slot="end">
        <svg>
          <use x="2" y="2" href="img/edge/icons.svg#mic-new-20-regular" />
        </svg>
      </phx-button>
    </copilot-composer>
    <div id="main">
      <div id="header">
        <svg>
          <use href="img/edge/icons.svg#copilot-20-regular" />
        </svg>
        Make the most of your lunch break
      </div>
      <div id="cards">
        <div id="news">
          <h1>
            Tonight’s perfect for <a href="">Halloumi Tacos</a>—picky eater
            approved! <a href="">Grab ingredients</a> on the way home.
          </h1>
          <div id="chips">
            <newtab-chip>Veggie hacks for picky eaters</newtab-chip>
            <newtab-chip>Recipes using ingredients I have</newtab-chip>
          </div>
        </div>
        <newtab-card>
          <h2 slot="heading">Continue researching 529 college plans</h2>
        </newtab-card>
        <newtab-card>
          <h2 slot="heading">
            Have you seen the new trailer for Heretic by A24? It looks
            spine-chilling!
          </h2>
        </newtab-card>
        <newtab-card>
          <h2 slot="heading">Heatwave intensifies around the Puget Sound</h2>
        </newtab-card>
      </div>
    </div>
  </div>
`;

const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }

  #content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 96px;
    gap: 96px;
  }

  #main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacingVerticalXXL};
    width: 100%;
    min-width: 320px;
    padding: ${spacingHorizontalL};
  }

  copilot-composer {
    width: 100%;
    max-width: 512px;
  }

  #header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: ${spacingHorizontalSNudge};

    font-size: ${typographyStyles.body2.fontSize};
    font-weight: ${typographyStyles.body2.fontWeight};
    line-height: ${typographyStyles.body2.lineHeight};
    font-family: ${typographyStyles.body2.fontFamily};
    color: ${colorNeutralForegroundHint};

    svg {
      width: 20px;
      height: 20px;
    }
  }

  #cards {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalL};

    * {
      flex: 1;
    }
  }

  #news {
    h1 {
      font-family: 'Lora', serif;
      font-weight: 400;
      font-size: 32px;
      line-height: 1.3;
      margin: 0;

      a {
        font-style: italic;
        color: ${colorBrandForegroundLink};
        text-decoration: underline;
        text-decoration-style: dotted;
        text-underline-offset: 8px;

        &:hover {
          color: ${colorBrandForegroundLinkHover};
        }
      }
    }

    #chips {
      display: flex;
      flex-direction: column;
      gap: ${spacingHorizontalS};
      margin-top: ${spacingHorizontalL};
    }
  }
`;

@customElement({
  name: 'edge-newtab',
  template,
  styles,
})
export class EdgeNewTab extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;
}
