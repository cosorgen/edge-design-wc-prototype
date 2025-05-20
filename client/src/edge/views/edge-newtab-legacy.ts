import {
  html,
  css,
  FASTElement,
  customElement,
  observable,
  repeat,
} from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { TabService } from '#servicestabService.js';
import {
  backgroundCardOnprimaryDefaultHover,
  backgroundCardOnprimaryDefaultRest,
  backgroundCtrlSubtleHover,
  cornerCircular,
  cornerCtrlRest,
  ctrlOmniboxBackgroundRest,
  ctrlLinkForegroundBrandRest,
  foregroundCtrlNeutralPrimaryRest,
  foregroundCtrlNeutralSecondaryRest,
  gapBetweenContentMedium,
  gapBetweenContentSmall,
  gapBetweenContentXsmall,
  paddingContentLarge,
  paddingContentMedium,
  paddingContentSmall,
  paddingContentXsmall,
  paddingContentXxlarge,
  paddingContentXxsmall,
  shadowFlyout,
  strokeCtrlOnoutlineRest,
  strokewidthDefault,
  textGlobalBody2Fontsize,
  textGlobalBody2Lineheight,
  textStyleDefaultHeaderWeight,
  textStyleDefaultRegularFontfamily,
  textStyleDefaultRegularWeight,
  ctrlLinkForegroundBrandHover,
} from '@phoenixui/themes/smtc-tokens.js';

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
  {
    title: 'Spotify',
    url: 'https://www.spotify.com',
    icon: 'img/edge/newtab/spotify.png',
  },
  {
    title: 'Yahoo!',
    url: 'https://www.yahoo.com',
    icon: 'img/edge/newtab/yahoo.png',
  },
  {
    title: 'Medium',
    url: 'https://www.medium.com',
    icon: 'img/edge/newtab/medium.png',
  },
];

const template = html<EdgeNewTab>`<img
    id="of-the-day"
    src="${(x) => x.imageOfTheDay}"
    alt="Background image"
  />
  <div id="content">
    <div id="main">
      <div id="logo">
        <img src="img/edge/microsoft-logo.svg" alt="Microsoft" />
        Microsoft Start
      </div>
      <div id="actions">
        <mai-button icon-only appearance="subtle" size="large">
          <svg>
            <use href="img/edge/icons.svg#settings-24-regular"></use>
          </svg>
        </mai-button>
        <mai-button icon-only appearance="subtle" size="large">
          <svg>
            <use href="img/edge/icons.svg#grid-dots-24-regular"></use>
          </svg>
        </mai-button>
      </div>
      <div id="image-actions">
        <mai-button icon-only appearance="subtle">
          <svg>
            <use href="img/edge/icons.svg#image-20-regular"></use>
          </svg>
        </mai-button>
        <mai-button icon-only appearance="subtle">
          <svg>
            <use href="img/edge/icons.svg#arrow-maximize-20-regular"></use>
          </svg>
        </mai-button>
      </div>
      <div id="searchbox">
        <div id="start">
          <svg>
            <use href="img/edge/icons.svg#search-24-regular"></use>
          </svg>
          <input type="text" placeholder="Search Microsoft and the web" />
        </div>
        <button>
          <img src="img/edge/copilot-icon.svg" alt="Voice search" />
        </button>
      </div>
      <div id="top-sites">
        ${repeat(
          topSites,
          html`
            <div
              class="top-site"
              @click="${(x, c) => c.parent.handleLinkClick(x.url)}"
              role="button"
            >
              <img src="${(x) => x.icon}" alt="${(x) => x.title}" />
              <div>${(x) => x.title}</div>
            </div>
          `,
        )}
        <div class="top-site" role="button">
          <svg>
            <use href="img/edge/icons.svg#add-24-regular"></use>
          </svg>
          <div>Add</div>
        </div>
      </div>
    </div>
    <div id="feed">
      <div id="feed-switch">
        <div active>Discover</div>
        <div>Following</div>
      </div>
      <div id="headings">
        <a href="">News</a>
        <a href="">Sports</a>
        <a href="">Play</a>
        <a href="">Money</a>
        <a href="">Gaming</a>
        <a href="">Weather</a>
        <a href="">Watch</a>
        <a href="">Learning</a>
        <a href="">Shopping</a>
        <a href="">Health</a>
        <a href="">Travel</a>
        <a href="">Traffic</a>
        <a href="">Autos</a>
        <a href="">Real Estate</a>
      </div>
      <div id="feed-actions">
        <mai-button shape="circular">
          <svg slot="start" width="20px" height="20px">
            <use href="img/edge/icons.svg#star-edit-20-regular"></use>
          </svg>
          Personalize
        </mai-button>
        <mai-button shape="circular">
          <svg slot="start" width="20px" height="20px">
            <use href="img/edge/icons.svg#options-20-regular"></use>
          </svg>
          Feed layout
        </mai-button>
      </div>
    </div>
  </div>`;

const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }

  img#of-the-day {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  #content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(transparent, rgba(0, 0, 0, 0.5));

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${gapBetweenContentMedium};
    width: 100%;
    max-width: 1024px;
    padding: ${paddingContentXxlarge};
    box-sizing: border-box; 
  }

  #logo {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 40px;
    display: flex;
    align-items: center;
    gap: ${gapBetweenContentSmall};
    padding: ${paddingContentXxlarge};
    font-size: ${textGlobalBody2Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalBody2Lineheight};
    font-family: ${textStyleDefaultRegularFontfamily};
    color: white;

    img {
      width: 20px;
      height: 20px;
    }
  }

  #actions {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXsmall};
    padding: ${paddingContentXxlarge};

    --smtc-foreground-ctrl-onsubtle-rest: white;
    --smtc-foreground-ctrl-icon-onsubtle-rest: white;
  }

  #image-actions {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${gapBetweenContentXsmall};
    padding: ${paddingContentXxlarge};

    --smtc-foreground-ctrl-onsubtle-rest: white;
    --smtc-foreground-ctrl-icon-onsubtle-rest: white;
  }

  #searchbox {
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${gapBetweenContentXsmall};
    border-radius: ${cornerCircular};
    background-color: ${ctrlOmniboxBackgroundRest};
    box-shadow: ${shadowFlyout};

    #start {
      padding: ${paddingContentSmall} ${paddingContentMedium};
      display: flex;
      align-items: center;
      gap: ${gapBetweenContentSmall};
      flex: 1;
      min-width: 512px;
    }

    svg {
      width: 24px;
      height: 24px;
    }

    input {
      border: none;
      background: transparent;
      flex: 1;

      font-size: ${textGlobalBody2Fontsize};
      font-weight: ${textStyleDefaultRegularWeight};
      line-height: ${textGlobalBody2Lineheight};
      font-family: ${textStyleDefaultRegularFontfamily};
      color: ${foregroundCtrlNeutralPrimaryRest};

      &:focus,
      &:focus-visible {
        outline: none;
      }
    }

    button {
      border: none;
      background: transparent;
      cursor: pointer;
      height: 100%;
      width: 48px;
      border-radius: 0 ${cornerCircular} ${cornerCircular} 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
      }
    }

    button:hover {
      background-color: ${backgroundCtrlSubtleHover};
    }
  }

  #top-sites {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow-x: auto;
  }

  #top-sites:has(> *:nth-last-child(n+6)) {
    justify-content: flex-start; /* Align items at the start when there's overflow */
  }

  .top-site {
    flex: 1;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${gapBetweenContentXsmall};
    padding: ${paddingContentXsmall} ${paddingContentXxsmall};
    color: white;
    cursor: pointer;

    &:hover {
      img {
        background-color: ${backgroundCardOnprimaryDefaultHover};
      }
    }

    img {
      width: 24px;
      height: 24px;
      padding: ${paddingContentXsmall};
      background-color: ${backgroundCardOnprimaryDefaultRest};
      border-radius: ${cornerCtrlRest};
      color: ${foregroundCtrlNeutralSecondaryRest};
    }

    svg {
      width: 20px;
      height: 20px;
      padding: 10px;
      background-color: ${backgroundCardOnprimaryDefaultRest};
      border-radius: ${cornerCtrlRest};
      color: ${foregroundCtrlNeutralSecondaryRest};
    }

    div {
      text-align: center;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  #feed {
    position: absolute;
    bottom: 0;
    width: 85%;
    max-width: 1440px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${gapBetweenContentMedium};
    background-color: ${backgroundCardOnprimaryDefaultRest};
    padding: ${paddingContentMedium} ${paddingContentLarge};
    border-radius: ${cornerCtrlRest} ${cornerCtrlRest} 0 0;
    color: ${foregroundCtrlNeutralSecondaryRest};
  }

  #feed-switch {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentSmall};
    border: ${strokewidthDefault} solid ${strokeCtrlOnoutlineRest};
    border-radius: ${cornerCtrlRest};
    padding: ${paddingContentXsmall} ${paddingContentMedium};

    [active] {
      color: ${ctrlLinkForegroundBrandRest};
      font-weight: ${textStyleDefaultHeaderWeight};
    }
  }

  #headings {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentMedium};
    overflow-x: auto;

    a {
      text-decoration: none;
      color: ${foregroundCtrlNeutralSecondaryRest};
    }

    a:hover {
      color: ${ctrlLinkForegroundBrandHover};
    }
  }

  #feed-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentMedium};

    mai-button {
      color: ${foregroundCtrlNeutralSecondaryRest};
    }
`;

@customElement({ name: 'edge-newtab-legacy', template, styles })
export class EdgeNewTab extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(TabService) ts!: TabService;
  @observable imageOfTheDay: string = '';

  connectedCallback() {
    super.connectedCallback();
    this.fetchImageOfTheDay();
  }

  handleLinkClick(url: string) {
    const activeTabId = this.ts.activeTabId;
    if (activeTabId) {
      this.ts.navigateTab(activeTabId, url);
    }
  }

  fetchImageOfTheDay() {
    fetch('/api/image-of-the-day')
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching Bing image of the day.');
        return res.text();
      })
      .then((data) => {
        this.imageOfTheDay = data;
      })
      .catch((e) => {
        console.error('Error fetching:', e);
      });
  }
}
