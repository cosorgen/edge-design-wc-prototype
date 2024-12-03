import {
  html,
  css,
  FASTElement,
  customElement,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import {
  borderRadiusCircular,
  colorNeutralCardBackground,
  colorNeutralCardBackgroundHover,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForegroundStaticInverted,
  colorNeutralStroke1,
  fontWeightRegular,
  shadow16,
  strokeWidthThin,
  typographyStyles,
} from '@mai-ui/kumo-theme';
import '../controls/newtab-composer.js';
import '../controls/newtab-top-site.js';
import { borderRadiusLarge } from '@mai-ui/phoenix-theme';

const topSites = [
  {
    title: 'YouTube',
    url: 'https://www.youtube.com',
    icon: 'img/edge/newtab/youtube.png',
  },
  {
    title: 'Netflix',
    url: 'https://www.netflix.com',
    icon: 'img/edge/newtab/netflix.png',
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com',
    icon: 'img/edge/newtab/instagram.png',
  },
  {
    title: 'The New York Times',
    url: 'https://www.nytimes.com',
    icon: 'img/edge/newtab/nytimes.png',
  },
  {
    title: 'Target',
    url: 'https://www.target.com',
    icon: 'img/edge/newtab/target.png',
  },
];

const template = html<EdgeNewTab>` <div id="content">
  <div id="background"></div>
  <div id="content-header">
    <newtab-composer
      @submit="${(x, c) => x.handleComposerSubmit(c.event)}"
    ></newtab-composer>
    <div id="top-sites">
      ${repeat(
        topSites,
        html`
          <newtab-top-site
            @click="${(x, c) => c.parent.handleLinkClick(x.url)}"
          >
            <img src="${(x) => x.icon}" alt="${(x) => x.title}" />
          </newtab-top-site>
        `,
      )}
      <newtab-top-site>
        <svg>
          <use x="2" y="2" href="img/edge/icons.svg#add-24-regular"></use>
        </svg>
      </newtab-top-site>
      <button id="lets-talk">
        <img src="img/edge/copilot-icon.svg" alt="Copilot icon" />
        Let's talk
      </button>
    </div>
  </div>
  <div class="section">
    <div class="section-header">
      <h2>Let’s prepare for your day, Elena</h2>
    </div>
    <div class="section-content" id="today">
      <div class="card" id="msn">
        <h3>MSN Daily</h3>
        <p>
          Candidates focus on swing states, IRS introduces new 401(k) limits,
          and more
        </p>
        <mai-button>
          <svg width="20px" height="20px" slot="start">
            <use
              x="2px"
              y="2px"
              href="img/edge/icons.svg#headphones-20-regular"
            />
          </svg>
          Listen
        </mai-button>
      </div>
      <div class="card" id="todo">
        <div id="todo-header">
          <img />
          <p>To Do</p>
        </div>
        <div id="todo-list">
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Get tires checked</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                <div class="todo-due-date today">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Buy new slippers</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                <div class="todo-due-date today">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Finish business presentation</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Work</div>
                <div class="todo-due-date today">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Send invites for Q4 planning</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Work</div>
                <div class="todo-due-date">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Tomorrow
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Take the kids for a haircut</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                <div class="todo-due-date">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Tomorrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" id="weather"></div>
      <div class="card" id="sports"></div>
      <div class="card" id="election"></div>
    </div>
  </div>
</div>`;

const smtcBackgroundCardOnImageRest = `var(--smtc-background-card-on-image-rest, ${colorNeutralCardBackground})`;
const smtcCornerComposerRest = `var(--smtc-corner-composer-rest, ${borderRadiusCircular})`;
const smtcStrokeComposerRest = `var(--smtc-stroke-composer-rest, ${colorNeutralStroke1})`;
const smtcShadowComposerRest = `var(--smtc-shadow-composer-rest, ${shadow16})`;
const smtcTextControlButtonFontFamily = `var(--smtc-text-control-button-font-family, ${typographyStyles.body1.fontFamily})`;
const smtcTextControlButtonFontSize = `var(--smtc-text-control-button-font-size, ${typographyStyles.body1.fontFamily})`;
const smtcTextControlButtonWeight = `var(--smtc-text-control-button-weight, ${typographyStyles.body1.fontWeight})`;
const smtcTextControlButtonLineHeight = `var(--smtc-text-control-button-line-height, ${typographyStyles.body1.lineHeight})`;
const smtcTextControlButtonColor = `var(--smtc-text-control-button-color, ${colorNeutralForeground2})`;
const smtcBackgroundCardOnImageHover = `var(--smtc-background-card-on-image-hover, ${colorNeutralCardBackgroundHover})`;
const smtcCornerCardRest = `var(--smtc-corner-card-rest, ${borderRadiusLarge})`;

const styles = css`
  :host {
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: fit-content;
    min-height: 100%;
    gap: 104px;
    padding: 104px;
  }

  #background {
    position: absolute;
    top: 0;
    left: 0;
    width: ${(x) => `${x.ews.viewportSize?.width - 1}px`};
    height: ${(x) => `${x.ews.viewportSize?.height - 1}px`};
    background: linear-gradient(180deg, #ffffff80 0%, white 100%),
      url('img/edge/newtab2/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }

  #content-header {
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  #top-sites {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }

  #lets-talk {
    padding: 16px 24px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    background: ${smtcBackgroundCardOnImageRest};
    border-radius: ${smtcCornerComposerRest};
    border: ${strokeWidthThin} solid ${smtcStrokeComposerRest};
    box-shadow: ${smtcShadowComposerRest};
    cursor: pointer;
    font-family: ${smtcTextControlButtonFontFamily};
    font-size: ${smtcTextControlButtonFontSize};
    font-weight: ${smtcTextControlButtonWeight};
    line-height: ${smtcTextControlButtonLineHeight};
    color: ${smtcTextControlButtonColor};
  }

  #lets-talk:hover {
    background: ${smtcBackgroundCardOnImageHover};
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1024px;
  }

  .section-header {
    width: 100%;

    h2 {
      margin: 0;
      font-family: ${typographyStyles.title3.fontFamily};
      font-size: ${typographyStyles.title3.fontSize};
      font-weight: ${typographyStyles.title3.fontWeight};
      line-height: ${typographyStyles.title3.lineHeight};
      color: ${colorNeutralForeground1};
    }
  }

  .section-content#today {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;

    :nth-child(1) {
      grid-area: 1 / 1 / 3 / 2;
    }

    :nth-child(2) {
      grid-area: 1 / 2 / 3 / 3;
    }

    :nth-child(3) {
      grid-area: 1 / 3 / 3 / 4;
    }
  }

  .card {
    border-radius: ${smtcCornerCardRest};
    padding: 16px;
  }

  .card#msn {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 200px;
    background: linear-gradient(
        0deg,
        #ff314ce5 10%,
        #ff314c99 40%,
        #ff314c1a 90%
      ),
      url('img/edge/newtab2/msnBackground.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: ${colorNeutralForegroundStaticInverted};

    h3 {
      margin: 0;
      margin-bottom: 6px;
      font-size: ${typographyStyles.title3.fontSize};
      font-weight: ${fontWeightRegular};
      line-height: ${typographyStyles.title3.lineHeight};
    }

    p {
      margin: 0;
      margin-bottom: 12px;
      font-size: ${typographyStyles.caption1.fontSize};
      font-weight: ${typographyStyles.caption1.fontWeight};
      line-height: ${typographyStyles.caption1.lineHeight};
    }

    mai-button {
      width: fit-content;
    }
  }

  .card#todo {
    display: none;
  }
`;

@customElement({
  name: 'edge-newtab',
  template,
  styles,
})
export class EdgeNewTab extends FASTElement {
  @inject(TabService) ts!: TabService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;

  handleComposerSubmit(e: Event): void {
    if (!(e instanceof CustomEvent)) return;

    const { url } = e.detail;
    if (!url) {
      return;
    }

    const activeTabId = this.ts.activeTabId;
    if (!activeTabId) {
      return;
    }

    this.ts.navigateTab(activeTabId, url);
  }

  handleLinkClick(url: string): void {
    if (this.ts.activeTabId) {
      this.ts.navigateTab(this.ts.activeTabId, url);
    }
  }
}
