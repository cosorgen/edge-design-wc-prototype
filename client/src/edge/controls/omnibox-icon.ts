import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import { cornerCtrlRest } from '@phoenixui/themes/kumo-tokens.js';

/**
 * The icon component for the Omnibox dropdown item.
 *
 * Displays either an icon or an image depending on the type of item.
 */

const iconIds = {
  search: 'search',
  entity: 'entity',
  history: 'history',
  site: 'page',
  profile: 'profile',
};

const template = html<OmniboxIcon>`
  <div id="wrapper">
    <img
      class="${(x) => x.type}"
      src="${(x) => x.entityImage}"
      alt="${(x) => x.type}"
    />
    <svg>
      <use href="img/edge/icons.svg#${(x) => iconIds[x.type]}-20-regular" />
    </svg>
  </div>
`;

const styles = css`
  #wrapper {
    width: 48px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    display: none;
    width: 20px;
    height: 20px;
  }

  img {
    display: none;
    width: 16px;
    height: 16px;
    object-fit: cover;
  }

  .entity {
    border-radius: ${cornerCtrlRest};
    width: 32px;
    height: 32px;
  }

  :host([type='entity']) img,
  :host([type='profile']) img,
  :host([type='site']) img,
  :host([type='history']) svg,
  :host([type='search']) svg {
    display: block;
  }
`;

@customElement({ name: 'omnibox-icon', template, styles })
export class OmniboxIcon extends FASTElement {
  @attr type: 'search' | 'entity' | 'history' | 'site' | 'profile' = 'entity';
  @attr({ attribute: 'entity-image' }) entityImage =
    'http://www.bing.com/th?id=OSK.1773fdbec232f8dd1169e371af62d36a&w=75&h=110&c=12';
}
