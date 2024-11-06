import {
  html,
  css,
  FASTElement,
  customElement,
  observable,
  repeat,
} from '@microsoft/fast-element';
import '@phoenixui/web-components/button.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { TabService } from '#servicestabService.js';
import {
  borderRadiusCircular,
  borderRadiusLarge,
  colorBackgroundOverlay,
  colorBrandForeground1,
  colorBrandForeground1Hover,
  colorLayerBackgroundDialog,
  colorNeutralCardBackground,
  colorNeutralCardBackgroundHover,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForegroundStaticInverted,
  colorNeutralStroke1,
  colorSubtleBackgroundHover,
  shadow8,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingVerticalL,
  spacingVerticalM,
  spacingVerticalMNudge,
  spacingVerticalS,
  spacingVerticalXXXL,
  spacingHorizontalXXXL,
  strokeWidthThin,
  typographyStyles,
} from '@phoenixui/themes';

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
        <phx-button icon-only appearance="subtle" size="large">
          <svg>
            <use href="img/edge/icons.svg#settings-24-regular"></use>
          </svg>
        </phx-button>
        <phx-button icon-only appearance="subtle" size="large">
          <svg>
            <use href="img/edge/icons.svg#grid-dots-24-regular"></use>
          </svg>
        </phx-button>
      </div>
      <div id="image-actions">
        <phx-button icon-only appearance="subtle">
          <svg>
            <use href="img/edge/icons.svg#image-20-regular"></use>
          </svg>
        </phx-button>
        <phx-button icon-only appearance="subtle">
          <svg>
            <use href="img/edge/icons.svg#arrow-maximize-20-regular"></use>
          </svg>
        </phx-button>
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
          <img src="img/edge/newtab/add.png" alt="add" />
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
        <phx-button shape="circular">
          <svg slot="start" width="20px" height="20px">
            <use href="img/edge/icons.svg#star-edit-20-regular"></use>
          </svg>
          Personalize
        </phx-button>
        <phx-button shape="circular">
          <svg slot="start" width="20px" height="20px">
            <use href="img/edge/icons.svg#options-20-regular"></use>
          </svg>
          Feed layout
        </phx-button>
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
    background: radial-gradient(transparent, ${colorBackgroundOverlay});

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
    gap: ${spacingVerticalL};
    width: 100%;
    max-width: 1024px;
    padding: ${spacingHorizontalXXXL};
    box-sizing: border-box; 
  }

  #logo {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 40px;
    display: flex;
    align-items: center;
    gap: ${spacingHorizontalM};
    padding: ${spacingVerticalXXXL};
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
    font-family: ${typographyStyles.subtitle2.fontFamily};
    color: ${colorNeutralForegroundStaticInverted};

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
    gap: ${spacingHorizontalS};
    padding: ${spacingVerticalXXXL};

    phx-button {
      color: ${colorNeutralForegroundStaticInverted};
    }
  }

  #image-actions {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacingHorizontalS};
    padding: ${spacingVerticalXXXL};

    phx-button {
      color: ${colorNeutralForegroundStaticInverted};
    }
  }

  #searchbox {
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${spacingHorizontalS};
    border-radius: ${borderRadiusCircular};
    background-color: ${colorLayerBackgroundDialog};
    box-shadow: ${shadow8};

    #start {
      padding: ${spacingVerticalM} ${spacingHorizontalL};
      display: flex;
      align-items: center;
      gap: ${spacingHorizontalM};
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

      font-size: ${typographyStyles.body2.fontSize};
      font-weight: ${typographyStyles.body2.fontWeight};
      line-height: ${typographyStyles.body2.lineHeight};
      font-family: ${typographyStyles.body2.fontFamily};
      color: ${colorNeutralForeground1};

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
      border-radius: 0 ${borderRadiusCircular} ${borderRadiusCircular} 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
      }
    }

    button:hover {
      background-color: ${colorSubtleBackgroundHover};
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
    gap: ${spacingVerticalS};
    padding: ${spacingVerticalS} ${spacingHorizontalXS};
    color: ${colorNeutralForegroundStaticInverted};
    cursor: pointer;

    &:hover {
      img {
        background-color: ${colorNeutralCardBackgroundHover};
      }
    }

    img {
      width: 24px;
      height: 24px;
      padding: ${spacingVerticalS};
      background-color: ${colorNeutralCardBackground};
      border-radius: ${borderRadiusLarge};
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
    gap: ${spacingVerticalL};
    background-color: ${colorNeutralCardBackground};
    padding: ${spacingVerticalMNudge} ${spacingHorizontalXL};
    border-radius: ${borderRadiusLarge} ${borderRadiusLarge} 0 0;
    color: ${colorNeutralForeground2};
  }

  #feed-switch {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalM};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-radius: ${borderRadiusLarge};
    padding: ${spacingVerticalS} ${spacingHorizontalL};

    [active] {
      color: ${colorBrandForeground1};
      font-weight: ${typographyStyles.body1Strong.fontWeight};
    }
  }

  #headings {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalL};
    overflow-x: auto;

    a {
      text-decoration: none;
      color: ${colorNeutralForeground2};
    }

    a:hover {
      color: ${colorBrandForeground1Hover};
    }
  }

  #feed-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalM};

    phx-button {
      color: ${colorNeutralForeground2};
    }
`;

@customElement({
  name: 'edge-newtab-legacy',
  template,
  styles,
})
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
