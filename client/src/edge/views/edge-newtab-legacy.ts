import {
  html,
  css,
  FASTElement,
  customElement,
  observable,
} from '@microsoft/fast-element';
import '@phoenixui/web-components/button.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { TabService } from '#servicestabService.js';
import {
  borderRadiusCircular,
  colorBackgroundOverlay,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  colorNeutralForegroundStaticInverted,
  colorSubtleBackgroundHover,
  shadow8,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalL,
  spacingVerticalM,
  spacingVerticalXXXL,
  typographyStyles,
} from '@phoenixui/themes';

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
      <div id="top-sites"></div>
    </div>
    <div id="widgets"></div>
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

    phx-button{
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

    phx-button{
      color: ${colorNeutralForegroundStaticInverted};
    }
  }

  #searchbox {
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

    button:hover {
      background-color: ${colorSubtleBackgroundHover};
    }
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
    this.ts.navigateActiveTab(url);
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
