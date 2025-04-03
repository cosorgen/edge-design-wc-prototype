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
import '@mai-ui/spinner/define.js';
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
  <h1>Palette Playground</h1>
  <h2 style="color: hsl(${(x) => hexToHue(x.ss.themeColor)}, 50%, 50%)">
    ${(x) =>
      x.ss.themeColor
        ? `Seed hue: ${hexToHue(x.ss.themeColor)}º`
        : 'Select a theme color in settings'}
  </h2>
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
                (x, c) => Object.keys(c.parent.colors[x as Styles]['primary']),
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
                            return colors[style as Styles][palette as Palette][
                              tone as number
                            ];
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
`;

const styles = css`
  :host {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 24px;
    width: 100%;
    height: 100%;
    overflow: auto;
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
