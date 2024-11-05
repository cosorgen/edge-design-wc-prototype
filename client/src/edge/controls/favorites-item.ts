import {
  customElement,
  html,
  css,
  FASTElement,
  attr,
  when,
} from '@microsoft/fast-element';
import '@phoenixui/web-components/toggle-button.js';
import '@phoenixui/web-components/button.js';
import {
  borderRadiusMedium,
  colorNeutralForeground1,
  colorSubtleBackground,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  typographyStyles,
} from '@phoenixui/themes';

const template = html<FavoritesItem>` <button
  part="favorite-button"
  @click="${(x) => x.handleClick()}"
>
  ${when(
    (x) => x.type === 'site',
    html`<img src="${(x) => x.favicon}" alt="${(x) => x.title}" />`,
    html`<img
      src="./img/edge/folder-16-filled-yellow.svg"
      alt="${(x) => x.title}"
    />`,
  )}
  <div class="title-container">${(x) => x.title}</div>
</button>`;

const styles = css`
  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalSNudge};
    border: none;
    border-radius: ${borderRadiusMedium};
    background: ${colorSubtleBackground};
    cursor: pointer;
    width: 100%;
    max-width: 256px;

    font-family: ${typographyStyles.caption1.fontFamily};
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
    color: ${colorNeutralForeground1};
  }

  .title-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button:hover {
    background: ${colorSubtleBackgroundHover};
  }

  button:active {
    background: ${colorSubtleBackgroundPressed};
  }

  :host([pressed='true']) button {
    background: ${colorSubtleBackgroundSelected};
  }

  img {
    width: 16px;
  }
`;

@customElement({
  name: 'favorites-item',
  template,
  styles,
})
export class FavoritesItem extends FASTElement {
  @attr type: 'site' | 'folder' = 'site';
  @attr title = 'Favorite item';
  @attr favicon = '';
  @attr({ mode: 'boolean' }) pressed = false;

  handleClick() {
    if (this.type === 'folder') this.pressed = !this.pressed;
  }
}
