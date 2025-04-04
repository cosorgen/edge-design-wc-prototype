import EdgeSettingsSerivce from '#servicessettingsService.js';
import {
  css,
  FASTElement,
  html,
  customElement,
  attr,
  observable,
  repeat,
  when,
  Observable,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '@mai-ui/button/define.js';
import '@mai-ui/spinner/define.js';
import '@mai-ui/text-input/define.js';
import '@mai-ui/switch/define.js';
import '@mai-ui/badge/define.js';
import '@mai-ui/checkbox/define.js';
import '@mai-ui/dropdown/define.js';
import '@mai-ui/option/define.js';
import '@mai-ui/listbox/define.js';
import '@mai-ui/divider/define.js';
import '@mai-ui/link/define.js';
import '@mai-ui/message-bar/define.js';
import '@mai-ui/progress-bar/define.js';
import '@mai-ui/radio/define.js';
import '@mai-ui/slider/define.js';
import '@mai-ui/tooltip/define.js';
import '@mai-ui/tree/define.js';
import '@mai-ui/tree-item/define.js';
import {
  backgroundWebPagePrimary,
  foregroundContentNeutralPrimary,
} from '@edge-design/kumo-theme/tokens.js';

function FormatTitle(title: string): string {
  return title
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}

function hexToHue(hex?: string): number | undefined {
  if (!hex) return;
  hex = hex.replace(/^#/, ''); // Remove the #
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return h; // Hue in degrees
}

const template = html<PalettePlayground>`
  <div class="group">
    <h1>Palette Playground</h1>
    <h2 style="color: hsl(${(x) => hexToHue(x.ss.themeColor)}, 50%, 50%)">
      ${(x) =>
        x.ss.themeColor
          ? `Seed hue: ${hexToHue(x.ss.themeColor)}º`
          : 'Select a theme color in settings'}
    </h2>
  </div>
  <div class="group">
    <h2>Controls</h2>
    <div id="controls">
      <mai-button>Neutral</mai-button>
      <mai-button appearance="primary">Primary</mai-button>
      <mai-button appearance="outline">Outline</mai-button>
      <mai-button appearance="subtle">Subtle</mai-button>
      <mai-spinner></mai-spinner>
      <mai-text-input type="text" placeholder="Text input"></mai-text-input>
      <mai-switch checked></mai-switch>
      <mai-badge>Badge</mai-badge>
      <mai-checkbox checked>Checkbox</mai-checkbox>
      <mai-divider orientation="vertical">Default</mai-divider>
      <mai-divider orientation="vertical" appearance="subtle"
        >Subtle</mai-divider
      >
      <mai-dropdown>
        <mai-listbox>
          <mai-option>Option 1</mai-option>
          <mai-option>Option 2</mai-option>
          <mai-option>Option 3</mai-option>
        </mai-listbox>
      </mai-dropdown>
      <mai-link href="#">Link</mai-link>
      <mai-progress-bar appearance="indeterminate"></mai-progress-bar>
      <mai-message-bar intent="info"
        ><span slot="icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10ZM9.50806 8.91012C9.55039 8.67687 9.75454 8.49999 10 8.49999C10.2455 8.49999 10.4496 8.67687 10.4919 8.91012L10.5 8.99999V13.5021L10.4919 13.592C10.4496 13.8253 10.2455 14.0021 10 14.0021C9.75454 14.0021 9.55039 13.8253 9.50806 13.592L9.5 13.5021V8.99999L9.50806 8.91012ZM9.25 6.74999C9.25 6.33578 9.58579 5.99999 10 5.99999C10.4142 5.99999 10.75 6.33578 10.75 6.74999C10.75 7.16421 10.4142 7.49999 10 7.49999C9.58579 7.49999 9.25 7.16421 9.25 6.74999Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>

        This is a message bar that provides information to the user.

        <mai-button slot="actions" size="small" appearance="outline">
          Action
        </mai-button>

        <mai-button slot="dismiss" size="small" appearance="subtle" icon-only>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fluent--dismiss-20-regular"
            viewBox="0 0 20 20"
            aria-hidden="true"
            width="20"
            height="20"
          >
            <path
              fill="currentColor"
              d="m4.089 4.216l.057-.07a.5.5 0 0 1 .638-.057l.07.057L10 9.293l5.146-5.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L10.707 10l5.147 5.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L10 10.707l-5.146 5.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L9.293 10L4.146 4.854a.5.5 0 0 1-.057-.638l.057-.07z"
            ></path>
          </svg> </mai-button
      ></mai-message-bar>
      <mai-radio checked>Radio</mai-radio>
      <mai-slider min="0" max="100" value="50" step="10"></mai-slider>
      <mai-tooltip anchor="tooltip"> This is a tooltip </mai-tooltip>
      <mai-button id="tooltip">Tooltip</mai-button>
      <mai-tree>
        <mai-tree-item expanded>
          Item 1
          <mai-tree-item>Item 2</mai-tree-item>
          <mai-tree-item>Item 3</mai-tree-item>
        </mai-tree-item>
      </mai-tree>
    </div>
  </div>
  <div class="group">
    <h2>Palettes</h2>
    ${when(
      (x) => x.loading,
      html`<mai-spinner></mai-spinner>`,
      html` <div id="palettes">
        ${repeat(
          (pp) => Object.keys(pp.colors || {}),
          html`
            <table>
              <thead>
                <tr>
                  ${repeat(
                    (style, c) => Object.keys(c.parent.colors[style as Styles]),
                    html`
                      <th>
                        ${(_, c) => FormatTitle(c.parent)}
                        ${(x) => FormatTitle(x)}
                      </th>
                    `,
                  )}
                </tr>
              </thead>
              <tbody>
                ${repeat(
                  (x, c) =>
                    Object.keys(c.parent.colors[x as Styles]['primary']),
                  html`
                    <tr>
                      ${repeat(
                        (x, c) => {
                          const { colors } = c.parentContext.parent;
                          const style = c.parent;
                          return Object.keys(colors[style as Styles]);
                        },
                        html`
                          <td
                            style="background-color: ${(palette, c) => {
                              const { colors } =
                                c.parentContext.parentContext.parent;
                              const style = c.parentContext.parent;
                              const tone = c.parent;
                              return colors[style as Styles][
                                palette as Palette
                              ][tone as number];
                            }}; color: ${(_, c) => {
                              const tone = c.parent;
                              return tone > 50 ? 'black' : 'white';
                            }}"
                          >
                            ${(palette, c) => {
                              const { colors } =
                                c.parentContext.parentContext.parent;
                              const style = c.parentContext.parent;
                              const tone = c.parent;
                              return `${tone} ${colors[style as Styles][
                                palette as Palette
                              ][tone as number].toUpperCase()}`;
                            }}
                          </td>
                        `,
                      )}
                    </tr>
                  `,
                )}
              </tbody>
            </table>
          `,
        )}
      </div>`,
    )}
  </div>
`;

const styles = css`
  :host {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 64px;
    padding: 24px;
    width: 100%;
    height: fit-content;
    background-color: ${backgroundWebPagePrimary};
    color: ${foregroundContentNeutralPrimary};
  }

  :host([active]) {
    display: flex;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h2 {
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  #controls {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    width: 100%;
    overflow: hidden;
  }

  #palettes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  table {
    border-collapse: collapse;
  }

  th {
    text-align: left;
    vertical-align: bottom;
  }

  td {
    box-sizing: border-box;
    width: 128px;
    height: 128px;
    padding: 8px;
    text-align: left;
    vertical-align: bottom;
  }
`;

declare type Styles = 'tonal' | 'vibrant' | 'expressive' | 'neutral';
declare type Palette =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'neutral'
  | 'neutralVariant';

@customElement({ name: 'palette-playground', template, styles })
export class PalettePlayground extends FASTElement {
  @attr({ mode: 'boolean' }) active = false;
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;
  @observable colors!: Record<Styles, Record<Palette, Record<number, string>>>;
  @observable loading = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    this.fetchPalette();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  addEventListeners(): void {
    Observable.getNotifier(this.ss).subscribe(this, 'themeColor');
  }

  removeEventListeners(): void {
    Observable.getNotifier(this.ss).unsubscribe(this);
  }

  handleChange(_subject: unknown, property: string) {
    if (property === 'themeColor') {
      this.fetchPalette();
    }
  }

  fetchPalette() {
    if (this.ss.themeColor) {
      this.loading = true;
      fetch(`/api/palette-gen?seed=${encodeURIComponent(this.ss.themeColor)}`)
        .then((res) => {
          res.json().then((data) => {
            this.colors = data;
            this.loading = false;
          });
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
        });
    }
  }
}
