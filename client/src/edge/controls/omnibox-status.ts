import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  observable,
} from '@microsoft/fast-element';
import { colorNeutralForeground3 } from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/divider.js';

/**
 * omnibox-status is a presentational component that renders
 * a button for the address bar that shows the status of the
 * current page.
 *
 * The type of button is determined by the URL of the current page.
 */

const labels = {
  search: '',
  'not-secure': 'Not secure',
  secure: '',
  file: 'File',
  edge: 'Edge',
};

const iconIds = {
  search: 'search-20-regular',
  'not-secure': 'lock-open-20-regular',
  secure: 'lock-closed-20-regular',
  file: 'file-20-regular',
  edge: 'edge-20-regular',
};

const template = html<OmniboxStatus>`
  <phx-button
    appearance="subtle"
    size="small"
    shape="circular"
    ?icon-only="${(x) => labels[x.type] === ''}"
  >
    <svg ?slot="${(x) => (labels[x.type] !== '' ? 'icon' : null)}">
      <use href="img/edge/icons.svg#${(x) => iconIds[x.type]}" />
    </svg>
    <div part="label">${(x) => labels[x.type]}</div>
    <phx-divider orientation="vertical"></phx-divider>
  </phx-button>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }

  phx-button {
    color: ${colorNeutralForeground3};
  }

  [icon-only] phx-divider {
    display: none;
  }

  phx-divider {
    min-height: 1px;
    height: unset;
`;

@customElement({
  name: 'omnibox-status',
  template,
  styles,
})
export class OmniboxStatus extends FASTElement {
  @attr value: string | null = '';
  @observable type: 'search' | 'not-secure' | 'secure' | 'file' | 'edge' =
    'search';

  valueChanged() {
    this.updateType();
  }

  updateType() {
    if (typeof this.value !== 'string') return;

    if (this.value.startsWith('http://')) {
      this.type = 'not-secure';
    } else if (this.value.startsWith('https://')) {
      this.type = 'secure';
    } else if (
      this.value.startsWith('edge://') &&
      this.value !== 'edge://newtab'
    ) {
      this.type = 'edge';
    } else if (this.value.startsWith('file://')) {
      this.type = 'file';
    } else {
      this.type = 'search';
    }
  }
}
