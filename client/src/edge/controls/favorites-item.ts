import {
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtlePressed,
  backgroundCtrlSubtleRest,
  cornerCtrlRest,
  foregroundCtrlNeutralPrimaryRest,
  gapBetweenContentXxsmall,
  paddingContentXsmallnudge,
  textGlobalCaption1Fontsize,
  textGlobalCaption1Lineheight,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
} from '@edge-design/kumo-theme/tokens.js';
import {
  customElement,
  html,
  css,
  FASTElement,
  attr,
  when,
} from '@microsoft/fast-element';

const template = html<FavoritesItem>` <button
  part="favorite-button"
  @click="${(x) => x.handleClick()}"
>
  ${when(
    (x) => x.type === 'site',
    html`<img src="${(x) => x.favicon}" alt="${(x) => x.title}" />`,
    html`<svg>
      <use href="./img/edge/icons.svg#folder-16-regular" />
    </svg>`,
  )}
  <div id="title">${(x) => x.title}</div>
</button>`;

const styles = css`
  :host {
    display: block;
    height: fit-content;
    overflow: hidden;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXxsmall};
    padding: ${paddingContentXsmallnudge};
    border: none;
    border-radius: ${cornerCtrlRest};
    background: ${backgroundCtrlSubtleRest};
    cursor: pointer;
    width: 100%;
    max-width: 256px;
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  #title {
    flex: 1;
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalCaption1Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalCaption1Lineheight};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button:hover {
    background: ${backgroundCtrlSubtleHover};
  }

  button:active {
    background: ${backgroundCtrlSubtlePressed};
  }

  :host([pressed='true']) button {
    background: ${backgroundCtrlSubtlePressed};
  }

  img {
    width: 16px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

@customElement({ name: 'favorites-item', template, styles })
export class FavoritesItem extends FASTElement {
  @attr type: 'site' | 'folder' = 'site';
  @attr title = 'Favorite item';
  @attr favicon = '';
  @attr({ mode: 'boolean' }) pressed = false;

  handleClick() {
    if (this.type === 'folder') this.pressed = !this.pressed;
  }
}
