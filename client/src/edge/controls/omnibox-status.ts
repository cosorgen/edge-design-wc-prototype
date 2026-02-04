import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  observable,
  when,
} from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import '@mai-ui/divider/define.js';
import {
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtleRest,
  cornerCircular,
  foregroundCtrlNeutralSecondaryRest,
  paddingCtrlSmHorizontalIconOnly,
} from '@mai-ui/design-tokens/tokens.js';

/**
 * omnibox-status is a presentational component that renders
 * a button for the address bar that shows the status of the
 * current page.
 *
 * The type of button is determined by the URL of the current page.
 */

const labels: Record<string, string> = {
  'not-secure': 'Not secure',
  file: 'File',
};

const iconIds: Record<string, string> = {
  search: 'search-20-regular',
  'not-secure': 'lock-open-20-regular',
  secure: 'lock-closed-20-regular',
  file: 'file-20-regular',
};

const imgPaths: Record<string, string> = { edge: 'favicon.ico' };

const template = html<OmniboxStatus>`
  <button>
    ${when(
      (x) => imgPaths[x.type],
      html`<img
        slot="${(x) => (labels[x.type] ? 'start' : undefined)}"
        src="${(x) => imgPaths[x.type]}"
      />`,
      html` <svg slot="${(x) => (labels[x.type] ? 'start' : undefined)}">
        <use href="img/edge/icons.svg#${(x) => iconIds[x.type]}" />
      </svg>`,
    )}
    ${when(
      (x) => labels[x.type],
      html` <div part="label">${(x) => labels[x.type]}</div> `,
    )}
  </button>
  ${when(
    (x) => labels[x.type],
    html` <mai-divider orientation="vertical"></mai-divider> `,
  )}
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${backgroundCtrlSubtleRest};
    border: none;
    padding: ${paddingCtrlSmHorizontalIconOnly};
    margin: 0;
    color: ${foregroundCtrlNeutralSecondaryRest};
    border-radius: ${cornerCircular};
  }

  button:hover {
    background: ${backgroundCtrlSubtleHover};
    cursor: pointer;
  }

  svg,
  img {
    width: 20px;
    height: 20px;
  }

  mai-divider {
    min-height: 16px;
    height: 100%;
  }

  mai-divider::before,
  mai-divider::after {
    height: 100%;
    min-height: 8px;
  }

  :host(:hover) mai-divider {
    display: none;
  }
`;

@customElement({ name: 'omnibox-status', template, styles })
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
