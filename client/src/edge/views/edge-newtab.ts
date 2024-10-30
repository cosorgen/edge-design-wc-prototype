import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '../../windows/controls/mica-material.js';
import '../controls/copilot-composer.js';
import '@phoenixui/web-components/button.js';
import '../controls/newtab-card.js';
import '../controls/newtab-chip.js';
import '../controls/newtab-composer.js';
import '../controls/newtab-feed-card.js';
import '../controls/newtab-feed-list.js';
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
import { TabService } from '#servicestabService.js';

const template = html<EdgeNewTab>`
  <mica-material
    top="${(x) => x.ws.getWindowById(x.ews.id)?.yPos}"
    left="${(x) => x.ws.getWindowById(x.ews.id)?.xPos}"
  ></mica-material>
  <div class="composer-positioning" id="composer-backdrop"></div>
  <div class="composer-positioning" id="composer-wrapper">
    <newtab-composer
      @submit="${(x, c) => x.handleComposerSubmit(c.event)}"
    ></newtab-composer>
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
        <div id="news" class="card-in" style="--index: 1">
          <h1>
            Tonight’s perfect for
            <a href="" @click="${(x) => x.handleLinkClick('halloumi tacos')}"
              >Halloumi Tacos</a
            >—picky eater approved!
            <a
              href=""
              @click="${(x) => x.handleLinkClick('halloumi taco ingredients')}"
              >Grab ingredients</a
            >
            on the way home.
          </h1>
          <div id="chips">
            <newtab-chip
              @click="${(x) =>
                x.handleLinkClick(
                  'https://pickyeaterblog.com/the-best-of-the-picky-eater-my-top-10-most-popular-recipes/',
                )}"
              >Veggie hacks for picky eaters</newtab-chip
            >
            <newtab-chip
              @click="${(x) =>
                x.handleLinkClick(
                  'https://recipeland.com/recipe/v/bob-s-crock-pot-pizza-1582',
                )}"
              >Recipes using ingredients I have</newtab-chip
            >
          </div>
        </div>
        <newtab-card class="card-in" style="--index: 2;">
          <img
            load="pre"
            slot="hero"
            src="img/edge/newtab/529plan.jpg"
            alt=""
          />
          <h2 slot="heading">Continue researching 529 college plans</h2>
          <newtab-card-item
            @click="${(x) =>
              x.handleLinkClick('529 college savings plan tax advantages')}"
            >Learn about the tax advantages</newtab-card-item
          >
          <newtab-card-item
            @click="${(x) =>
              x.handleLinkClick('Open 529 college savings plan')}"
            >Set up a plan now</newtab-card-item
          >
          <newtab-card-item
            @click="${(x) =>
              x.handleLinkClick('529 college savings plan covered expenses')}"
            >Explore covered expenses</newtab-card-item
          >
        </newtab-card>
        <newtab-card class="card-in" style="--index: 3;">
          <img
            load="pre"
            slot="hero"
            src="img/edge/newtab/heretic.jpg"
            alt=""
          />
          <h2 slot="heading">
            Have you seen the new trailer for Heretic by A24? It looks
            spine-chilling!
          </h2>
          <newtab-card-item
            @click="${(x) => x.handleLinkClick('Heretic by A24 trailer')}"
            >Watch the trailer</newtab-card-item
          >
          <newtab-card-item
            @click="${(x) => x.handleLinkClick('Heretic by A24 release date')}"
            >Remind me when it releases</newtab-card-item
          >
        </newtab-card>
        <newtab-card class="card-in" style="--index: 4;">
          <img
            load="pre"
            slot="hero"
            src="img/edge/newtab/weather.jpg"
            alt=""
          />
          <h2 slot="heading">Heatwave intensifies around the Puget Sound</h2>
          <newtab-card-item
            @click="${(x) =>
              x.handleLinkClick('Beaches near me for a heatwave')}"
            >Cool down at beaches near you</newtab-card-item
          >
          <newtab-card-item
            @click="${(x) =>
              x.handleLinkClick('Evening walk in the park for a heatwave')}"
            >Plan a walk for the evening</newtab-card-item
          >
          <newtab-card-item
            @click="${(x) =>
              x.handleLinkClick('Fans and sunscreen for a heatwave at Target')}"
          >
            Target Circle Week: Explore savings on fans and sunscreen
          </newtab-card-item>
        </newtab-card>
      </div>
    </div>
    <div id="feed">
      <newtab-feed-card
        @click="${(x) =>
          x.handleLinkClick(
            'https://markets.businessinsider.com/news/stocks/apple-stock-price-soars-new-record-high-ai-focused-wwdc-2024-6#:~:text=Apple%20stock%20soared%20as%20much%20as%207%25%20on,falling%202%25%20on%20Monday%20following%20the%20WWDC%20event',
          )}"
        class="card-in"
        style="--index: 5;"
      >
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
        features will boost s ales
      </newtab-feed-card>
      <newtab-feed-card
        @click="${(x) =>
          x.handleLinkClick('https://www.espn.com/mlb/recap?gameId=401569551')}"
        class="card-in"
        style="--index: 6;"
      >
        <img slot="hero" src="img/edge/newtab/mariners.jpg" alt="" />
        <img
          slot="publisher-icon"
          src="https://s.yimg.com/rz/l/favicon.ico"
          alt=""
        />
        <span slot="publisher">NBC</span>
        <span slot="time">4d</span>
        <h3 slot="heading">Mariners shut out Rangers 5-0 for series sweep</h3>
        Mariners beat the Texas Rangers 5-0 with Gilbert pitching and Locklear
        with a home run.
      </newtab-feed-card>
      <newtab-feed-list class="card-in" style="--index: 7;">
        <newtab-feed-list-item
          @click="${(x) =>
            x.handleLinkClick(
              'https://seattle.eater.com/2024/5/15/24156807/oyster-cellars-opening-chef-brendan-mcgillF',
            )}"
        >
          <img
            slot="publisher-icon"
            src="img/edge/newtab/sources/cnn.png"
            alt=""
          />
          <span slot="time">4d</span>
          Downtown Seattle’s New Seafood Bar Finds Inspiration in the Historic
          Oyster Bars of NYC
          <img slot="hero" src="img/edge/newtab/oysters.jpg" alt="" />
        </newtab-feed-list-item>
        <newtab-feed-list-item
          @click="${(x) =>
            x.handleLinkClick(
              'https://people.com/beyonce-destinys-child-giggle-over-jay-z-mtv-blooper-reel-8625028',
            )}"
        >
          <img
            slot="publisher-icon"
            src="img/edge/newtab/sources/people.png"
            alt=""
          />
          <span slot="time">1d</span>
          Beyoncé and Destiny's Child Giggle Over JAY-Z in Blooper Reel from MTV
          Spring Break 2000 Top 20 Countdown
          <img slot="hero" src="img/edge/newtab/yonce.jpg" alt="" />
        </newtab-feed-list-item>
        <newtab-feed-list-item
          @click="${(x) =>
            x.handleLinkClick(
              'https://www.nytimes.com/2022/10/06/education/learning/tutoring-learning-loss.html',
            )}"
        >
          <img
            slot="publisher-icon"
            src="img/edge/newtab/sources/abc.png"
            alt=""
          />
          <span slot="time">4d</span>
          Tutoring as a new strategy to combat learning loss in elementary
          schools Oyster Bars of NYC
          <img slot="hero" src="img/edge/newtab/tutor.jpg" alt="" />
        </newtab-feed-list-item>
        <newtab-feed-list-item
          @click="${(x) =>
            x.handleLinkClick(
              'https://www.usnews.com/education/k12/articles/what-school-choice-is-and-how-it-works',
            )}"
        >
          <img
            slot="publisher-icon"
            src="img/edge/newtab/sources/usa.png"
            alt=""
          />
          <span slot="time">1d</span>
          School choice in different states: a primer on education policy
          <img slot="hero" src="img/edge/newtab/school.jpg" alt="" />
        </newtab-feed-list-item>
        <newtab-feed-list-item
          @click="${(x) =>
            x.handleLinkClick(
              'https://seattle.eater.com/2024/5/15/24156807/oyster-cellars-opening-chef-brendan-mcgillF',
            )}"
        >
          <img
            slot="publisher-icon"
            src="img/edge/newtab/sources/cnn.png"
            alt=""
          />
          <span slot="time">4d</span>
          Downtown Seattle’s New Seafood Bar Finds Inspiration in the Historic
          Oyster Bars of NYC
          <img slot="hero" src="img/edge/newtab/oysters.jpg" alt="" />
        </newtab-feed-list-item>
      </newtab-feed-list>
      <newtab-feed-card
        @click="${(x) =>
          x.handleLinkClick(
            'https://www.realsimple.com/healthy-meal-prep-recipes-8664774',
          )}"
        class="card-in"
        style="--index: 8;"
      >
        <img slot="hero" src="img/edge/newtab/food.jpg" alt="" />
        <img
          slot="publisher-icon"
          src="https://s.yimg.com/rz/l/favicon.ico"
          alt=""
        />
        <span slot="publisher">Forbes</span>
        <span slot="time">4d</span>
        <h3 slot="heading">
          Healthy Meal Prep Recipe Ideas That’ll Make Your Life So Much Easier
        </h3>
        Save time and money with meal prep ideas.
      </newtab-feed-card>
      <newtab-feed-card
        @click="${(x) =>
          x.handleLinkClick(
            'https://bikesinsight.com/is-a-balance-bike-worth-it/#:~:text=A%20balance%20bike%20is%20worth%20it%20because%20it,your%20kid%20can%20also%20use%20it%20for%20exercise.',
          )}"
        class="card-in"
        style="--index: 9;"
      >
        <img slot="hero" src="img/edge/newtab/bikes.jpg" alt="" />
        <img
          slot="publisher-icon"
          src="https://s.yimg.com/rz/l/favicon.ico"
          alt=""
        />
        <span slot="publisher">The New York Times</span>
        <span slot="time">4d</span>
        <h3 slot="heading">Are balance bikes worth it? Experts say yes.</h3>
        A balance bike may be a little kid’s first introduction to zipping
        around on their own.
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
    overflow-x: hidden;
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
    min-height: 224px;
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

  #main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacingVerticalXXL};
    min-width: 320px;
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

  .card-in {
    transform: translateY(0px);
    opacity: 1;
    transition:
      transform ${durationUltraSlow} ${curveDecelerateMax}
        calc(var(--index) * 50ms),
      opacity ${durationUltraSlow} ${curveDecelerateMax}
        calc(var(--index) * 50ms);
  }

  @starting-style {
    .card-in {
      transform: translateY(-40px);
      opacity: 0;
    }
  }

  #feed {
    width: 100%;
    max-width: calc(256px * 4 + ${spacingHorizontalL} * 3);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: ${spacingHorizontalL};
    grid-template-areas:
      '. . list'
      '. . list';
  }

  newtab-feed-list {
    grid-area: list;
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
  @inject(TabService) ts!: TabService;
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

  handleComposerSubmit(e: Event): void {
    if (!(e instanceof CustomEvent)) return;

    const id = this.ts.getActiveTab()?.id;
    if (!id) return;

    this.ts.navigateTabById(id, e.detail);
  }

  handleLinkClick(url: string): void {
    const id = this.ts.getActiveTab()?.id;
    if (!id) return;
    this.ts.navigateTabById(id, url);
  }
}
