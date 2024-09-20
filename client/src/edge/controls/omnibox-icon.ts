import {
  customElement,
  FASTElement,
  html,
  css,
  observable,
  when,
} from '@microsoft/fast-element';

/**
 * The icon component for the Omnibox dropdown item.
 *
 * Displays either an icon or an image depending on the type of item.
 */

const template = html<OmniboxIcon>`
  ${when(
    (x) => x['entity-image'] !== '',
    html`
      <img
        id="${(x) => x.type}"
        src="${(x) => x['entity-image']}"
        alt="${(x) => x.type}"
      />
    `,
    html`
      <svg>
        <use href="img/edge/icons.svg#${(x) => x.type}-20-regular" />
      </svg>
    `,
  )}
`;

const styles = css`
  :host {
    width: 48px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

@customElement({
  name: 'omnibox-icon',
  template,
  styles,
})
export class OmniboxIcon extends FASTElement {
  @observable type: 'search' | 'entity' | 'history' | 'site' | 'profile' =
    'search';
  @observable 'entity-image' = '';
}
