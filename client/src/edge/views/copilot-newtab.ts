import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '@phoenixui/web-components/button.js';
import {
  borderRadiusCircular,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  colorNeutralForeground1Static,
  curveEasyEaseMax,
  durationSlow,
  durationUltraSlow,
  shadow8,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalL,
  spacingVerticalM,
  spacingVerticalS,
  spacingVerticalXL,
  spacingVerticalXXXL,
  typographyStyles,
} from '@phoenixui/themes';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { CopilotService } from '#servicescopilotService.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';

const template = html<CopilotNewtab>`<img
    id="bg"
    src="img/edge/newtab/copilot-bg-${(x) =>
      x.ess.theme === 'system' ? x.ws.theme : x.ess.theme}.avif"
    alt="Background image"
  />
  <div id="content" ?hidden="${(x) => x.cs.composerOverPage}">
    <div id="main" style="--index: 1;">
      <div id="searchbox">
        <div id="start">
          <svg>
            <use href="img/edge/icons.svg#search-24-regular"></use>
          </svg>
          <input
            type="text"
            placeholder="Search or enter web address"
            @keyup="{${(x, c) => x.handleKeyUp(c.event)}}"
          />
        </div>
      </div>
    </div>
    <div id="news" style="--index: 0;">
      <span
        >A stunning new museum in Dubai, an ancient forest discovered in a
        Chinese sinkhole, and a Korean Air plane’s safe evacuation after
        overshooting a runway highlight recent global events.</span
      >
      <div>
        <h2>Scroll for more news</h2>
        <svg>
          <use href="img/edge/icons.svg#chevron-circle-down-24-filled"></use>
        </svg>
      </div>
    </div>
  </div>
  <div id="start-actions" style="--index: 2;">
    <phx-button icon-only appearance="subtle" size="large">
      <svg>
        <use href="img/edge/icons.svg#grid-dots-24-regular"></use>
      </svg>
    </phx-button>
  </div>
  <div id="end-actions" style="--index: 2;">
    <phx-button icon-only appearance="subtle" size="large">
      <svg>
        <use x="-2" y="-2" href="img/edge/icons.svg#rewards-24-regular"></use>
      </svg>
    </phx-button>
    <phx-button icon-only appearance="subtle" size="large">
      <svg>
        <use href="img/edge/icons.svg#settings-24-regular"></use>
      </svg>
    </phx-button>
  </div>`;

const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;

    color: ${colorNeutralForeground1Static};
  }

  img#bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 85%;
    z-index: -1;
  }

  #content {
    position: absolute;
    inset: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-block-start: 160px;
    padding-block-end: 80px;
    gap: ${spacingVerticalXXXL};
  }

  #main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 896px;
  }

  #end-actions,
  #start-actions {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalS};
    padding: ${spacingVerticalXL};

    phx-button {
      color: inherit;
    }
  }

  #start-actions {
    left: 0;
    right: auto;
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
      color: ${colorNeutralForeground1};
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
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(8px);
    }
  }

  #news {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacingVerticalL};
    max-width: 512px;
    text-align: center;

    span {
      font-size: ${typographyStyles.body2.fontSize};
      font-weight: ${typographyStyles.body2.fontWeight};
      line-height: ${typographyStyles.body2.lineHeight};
      font-family: ${typographyStyles.body2.fontFamily};
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${spacingVerticalS};

      h2 {
        margin: 0;
        font-size: ${typographyStyles.subtitle2.fontSize};
        font-weight: ${typographyStyles.subtitle2.fontWeight};
        line-height: ${typographyStyles.subtitle2.lineHeight};
        font-family: ${typographyStyles.subtitle2.fontFamily};
      }

      svg {
        width: 24px;
        height: 24px;
        animation: bounce ${durationUltraSlow} 2s infinite alternate;
        cursor: pointer;
      }
    }
  }

  #main,
  #news {
    transform: translateY(0);
    opacity: 1;
    transition-property: transform, opacity;
    transition-duration: ${durationSlow};
    transition-timing-function: ${curveEasyEaseMax};
    transition-delay: calc(var(--index) * 50ms);
  }

  [hidden] #main,
  [hidden] #news {
    transform: translateY(-64px);
    opacity: 0;
  }
`;

@customElement({
  name: 'copilot-newtab',
  template,
  styles,
})
export class CopilotNewtab extends FASTElement {
  @inject(CopilotService) cs!: CopilotService;
  @inject(TabService) ts!: TabService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;

  handleKeyUp(event: Event): void {
    if (!(event instanceof KeyboardEvent)) return;

    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      this.handleSubmit(input.value);
    }
  }

  handleSubmit(url: string): void {
    if (!this.ts.activeTabId) return;
    this.ts.navigateTab(this.ts.activeTabId, url);
  }
}
