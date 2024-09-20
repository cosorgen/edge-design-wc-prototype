import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import { borderRadiusSmall } from '@phoenixui/themes';

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
  <img
    width="20"
    id="${(x) => x.type}"
    src="${(x) => x['entity-image']}"
    alt="${(x) => x.type}"
  />
  <svg>
    <use href="img/edge/icons.svg#${(x) => iconIds[x.type]}-20-regular" />
  </svg>
`;

const styles = css`
  :host {
    width: 48px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  img {
    display: none;
    width: 20px;
    height: 20px;
    margin-inline-start: 12px;
    object-fit: cover;
    border-radius: ${borderRadiusSmall};
  }

  #entity {
    border-radius: ${borderRadiusSmall};
    width: 32px;
    height: 32px;
    margin-inline-start: 8px;
    margin-block: -12px;
  }

  :host([type='entity']) img,
  :host([type='profile']) img,
  :host([type='site']) img {
    display: block;
  }
`;

@customElement({
  name: 'omnibox-icon',
  template,
  styles,
})
export class OmniboxIcon extends FASTElement {
  @attr type: 'search' | 'entity' | 'history' | 'site' | 'profile' = 'search';
  @attr 'entity-image' = '';
}
