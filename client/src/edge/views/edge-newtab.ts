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
  colorNeutralForeground2,
  colorNeutralStroke1,
  shadow16,
  strokeWidthThin,
  typographyStyles,
} from '@mai-ui/kumo-theme';
import '../controls/newtab-composer.js';
import '../controls/newtab-top-site.js';

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

const styles = css`
  :host {
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: auto;
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
