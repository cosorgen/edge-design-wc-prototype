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
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '@mai-ui/spinner/define.js';
import {
  backgroundWebPagePrimary,
  cornerCtrlRest,
  foregroundContentNeutralPrimary,
} from '@edge-design/kumo-theme/tokens.js';

function FormatTitle(title: string): string {
  return title
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}

const template = html<PalettePlayground>`
  <h1>Palette Playground</h1>
  <h2 style="color: ${(x) => x.ss.themeColor}">
    Seed color: ${(x) => x.ss.themeColor}
  </h2>
  ${when(
    (x) => x.loading,
    html`<mai-spinner></mai-spinner>`,
    html`${repeat(
      (pp) => Object.keys(pp.colors),
      html`
        <table>
          <thead>
            <tr>
              ${repeat(
                (style, c) => Object.keys(c.parent.colors[style as Styles]),
                html`
                  <th>
                    ${(_, c) => FormatTitle(c.parent)} ${(x) => FormatTitle(x)}
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
                          return colors[style as Styles][palette as Palette][
                            tone as number
                          ].toUpperCase();
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
    )}`,
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

  th {
    text-align: left;
    vertical-align: bottom;
  }

  td {
    box-sizing: border-box;
    width: 96px;
    height: 96px;
    padding: 8px;
    text-align: left;
    vertical-align: middle;
    border-radius: ${cornerCtrlRest};
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
  @observable loading = true;

  connectedCallback(): void {
    super.connectedCallback();
    fetch(
      `/api/palette-gen?seed=${encodeURIComponent(this.ss.themeColor)}`,
    ).then((res) => {
      res.json().then((data) => {
        this.colors = data;
        this.loading = false;
      });
    });
  }
}
