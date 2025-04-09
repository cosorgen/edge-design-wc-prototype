import {
  customElement,
  FASTElement,
  html,
  css,
  when,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#services/tabService.js';
import {
  ctrlTabBackgroundHorizontalActive,
  foregroundContentNeutralPrimary,
  gapBetweenContentXxsmall,
  paddingWindowDefault,
  textGlobalBody3Fontsize,
  textGlobalBody3Lineheight,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
} from '@edge-design/kumo-theme/tokens.js';

const template = html<TitleBar>`
  ${when(
    (x) => x.ts.tabsById[x.ts.activeTabId!]?.favicon,
    html`${when(
      (x) => x.ts.tabsById[x.ts.activeTabId!]?.favicon?.includes('.svg'),
      html`
        <svg>
          <use href="${(x) => x.ts.tabsById[x.ts.activeTabId!]?.favicon}"></use>
        </svg>
      `,
      html` <img src="${(x) => x.ts.tabsById[x.ts.activeTabId!]?.favicon}" /> `,
    )}`,
    html`<svg>
      <use href="./img/edge/icons.svg#document-16-regular"></use>
    </svg>`,
  )}
  ${(x) => x.ts.tabsById[x.ts.activeTabId!]?.title || 'Untitled tab'}
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${gapBetweenContentXxsmall};
    user-select: none;
    width: 100%;
    min-height: 40px;
    padding: ${paddingWindowDefault};
    background-color: ${ctrlTabBackgroundHorizontalActive};
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3Fontsize};
    line-height: ${textGlobalBody3Lineheight};
    font-weight: ${textStyleDefaultRegularWeight};
    color: ${foregroundContentNeutralPrimary};
  }

  img,
  svg {
    height: 16px;
    width: 16px;
  }
`;

@customElement({ name: 'title-bar', template, styles })
export class TitleBar extends FASTElement {
  @inject(TabService) ts!: TabService;

  handleTitleBarMouseDown(e: Event) {
    if (!(e instanceof MouseEvent)) return;
    if (e.button !== 0) return;
    this.$emit('windowmovestart');
  }
}
