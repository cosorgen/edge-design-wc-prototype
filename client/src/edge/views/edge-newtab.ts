import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '../../windows/controls/mica-material.js';
import '../controls/copilot-composer.js';
import '@phoenixui/web-components/button.js';
import '../controls/newtab-card.js';
import '../controls/newtab-chip.js';
import '../controls/newtab-composer.js';
import '../controls/newtab-feed-card.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import {
  colorBrandForegroundLink,
  colorBrandForegroundLinkHover,
  colorNeutralForegroundHint,
  curveDecelerateMax,
  durationUltraSlow,
  spacingHorizontalL,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalXXL,
  typographyStyles,
} from '@phoenixui/themes';

const template = html<EdgeNewTab>`
  <mica-material
    top="${(x) => x.ws.getWindowById(x.ews.id)?.yPos}"
    left="${(x) => x.ws.getWindowById(x.ews.id)?.xPos}"
  ></mica-material>
  <div class="composer-positioning" id="composer-backdrop"></div>
  <div class="composer-positioning" id="composer-wrapper">
    <newtab-composer></newtab-composer>
  </div>
  <div id="content">
    <div id="composer-placeholder"></div>
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
        <newtab-card style="--index: 0;">
          <img slot="hero" src="img/edge/newtab/529plan.jpg" alt="" />
          <h2 slot="heading">Continue researching 529 college plans</h2>
          <newtab-card-item>Learn about the tax advantages</newtab-card-item>
          <newtab-card-item>Set up a plan now</newtab-card-item>
          <newtab-card-item>Explore covered expenses</newtab-card-item>
        </newtab-card>
        <newtab-card style="--index: 1;">
          <img slot="hero" src="img/edge/newtab/heretic.jpg" alt="" />
          <h2 slot="heading">
            Have you seen the new trailer for Heretic by A24? It looks
            spine-chilling!
          </h2>
          <newtab-card-item>Watch the trailer</newtab-card-item>
          <newtab-card-item>Remind me when it releases</newtab-card-item>
        </newtab-card>
        <newtab-card style="--index: 2;">
          <img slot="hero" src="img/edge/newtab/weather.jpg" alt="" />
          <h2 slot="heading">Heatwave intensifies around the Puget Sound</h2>
          <newtab-card-item>Cool down at beaches near you</newtab-card-item>
          <newtab-card-item>Plan a walk for the evening</newtab-card-item>
          <newtab-card-item>
            Target Circle Week: Explore savings on fans and sunscreen
          </newtab-card-item>
        </newtab-card>
      </div>
    </div>
    <div id="feed">
      <newtab-feed-card>
        <img slot="hero" src="img/edge/newtab/wwdc.jpg" alt="" />
        <img
          slot="publisher-icon"
          src="https://s.yimg.com/rz/l/favicon.ico"
          alt=""
        />
        <span slot="publisher">Yahoo News</span>
        <span slot="time">4d</span>
        <h3 slot="heading">Apple stock soars after WWDC announcements</h3>
        Apple's stock soars to record high after WWDC · Investors hope that AI
        features will boost sales
      </newtab-feed-card>
    </div>
  </div>
`;

const styles = css`
  :host {
    --scroll-progress: 0;

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
    overflow-y: auto;
  }

  #main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacingVerticalXXL};
    min-width: 320px;
    padding: ${spacingHorizontalL};
  }

  #composer-placeholder {
    display: block;
    width: 100%;
    min-height: 64px;
  }

  .composer-positioning {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    inset-inline-start: 0;
    inset-inline-end: 16px; /* scrollbar */
    padding-block: max(32px, calc((1 - var(--scroll-progress)) * 96px));
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  #composer-backdrop {
    z-index: 1;
    min-height: 256px;
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }

  #composer-wrapper {
    z-index: 2;
  }

  newtab-composer {
    width: 100%;
    max-width: 512px;
    margin-inline: auto;
    pointer-events: auto;
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
  }

  #news {
    max-width: 256px;
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalL};

    h1 {
      font-family: 'Lora', serif;
      font-weight: 400;
      font-size: 32px;
      line-height: 1.3;
      margin: 0;
      white-space: normal;
      text-wrap: pretty;

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
    }
  }

  newtab-card {
    transform: translateY(0px);
    opacity: 1;
    transition: all ${durationUltraSlow} ${curveDecelerateMax}
      calc(var(--index) * 50ms);
  }

  @starting-style {
    newtab-card {
      transform: translateY(-40px);
      opacity: 0;
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
  _contentElement: HTMLDivElement | null = null;
  _composerWrapperElement: HTMLDivElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.unsetElements();
  }

  setElements(): void {
    this._contentElement = this.shadowRoot?.querySelector('#content') || null;
    this._composerWrapperElement =
      this.shadowRoot?.querySelector('#composer-backdrop') || null;
  }

  unsetElements(): void {
    this._contentElement = null;
    this._composerWrapperElement = null;
  }

  addEventListeners(): void {
    this._contentElement?.addEventListener('scroll', this.handleContentScroll);
  }

  removeEventListeners(): void {
    this._contentElement?.removeEventListener(
      'scroll',
      this.handleContentScroll,
    );
  }

  handleContentScroll = (): void => {
    if (!this._contentElement) return;

    const transitionEnd = 256;
    const scrollProgress = Math.min(
      1,
      (this._contentElement.scrollTop || 0) / transitionEnd,
    );

    this.style.setProperty('--scroll-progress', scrollProgress.toString());
  };
}
