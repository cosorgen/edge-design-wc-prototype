import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusCircular,
  colorLayerBackgroundDialog,
  colorNeutralForegroundHint,
  colorScrollbarForeground,
  colorScrollbarForegroundHover,
  curveDecelerateMax,
  curveEasyEaseMax,
  durationFast,
  shadow28,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingVerticalXS,
  strokeWidthThin,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';

const template = html<CopilotComposer>` <div
    part="grabber"
    @mouseover="${(x) => x.activate()}"
    }
  ></div>
  <div part="composer">
    <phx-button appearance="subtle" size="large" icon-only>
      <img src="img/edge/copilot-icon.svg" />
    </phx-button>
    <input type="text" placeholder="Talk about your page" />
    <div>
      <phx-button appearance="subtle" size="large" icon-only>
        <svg>
          <use href="img/edge/icons.svg#cast-20-regular" />
        </svg>
      </phx-button>
    </div>
  </div>`;

const styles = css`
  :host {
    width: 100%;
    height: ${spacingVerticalXS};
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: center;

    transition: all ${durationFast} ${curveEasyEaseMax};
  }

  :host([active]) {
    margin-block-start: -8px;
  }

  [part='grabber'] {
    position: absolute;
    width: 100%;
    max-width: 160px;
    height: ${spacingVerticalXS};
    background-color: ${colorScrollbarForeground};
    border-radius: ${borderRadiusCircular};
    cursor: pointer;

    transition: all ${durationFast} ${curveDecelerateMax};
  }

  :host([active]) [part='grabber'] {
    background-color: ${colorScrollbarForegroundHover};
    transform: translateY(-32px);
    opacity: 0;
  }

  [part='composer'] {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid ${colorLayerBackgroundDialog};
    border-radius: 28px;
    box-shadow: ${shadow28};
    overflow: hidden;

    transition: all ${durationFast} ${curveDecelerateMax};
    transform: translateY(8px);
    opacity: 0;
  }

  :host([active]) [part='composer'] {
    transform: translateY(-68px);
    opacity: 1;
  }

  [part='composer'] input {
    box-sizing: border-box;
    height: 48px;
    min-width: 384px;
    border: none;
    background: ${colorLayerBackgroundDialog};
    border-radius: 20px;
    color: inherit;
    padding: ${spacingHorizontalXS};
    padding-inline-start: ${spacingHorizontalXL};
    box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.03);

    font-size: 18px;
    line-height: 26px;
  }

  [part='composer'] input:focus {
    outline: none;
  }

  [part='composer'] input:empty::placeholder {
    color: ${colorNeutralForegroundHint};
  }
`;

@customElement({
  name: 'copilot-composer',
  template,
  styles,
})
export class CopilotComposer extends FASTElement {
  @attr({ mode: 'boolean' }) active = false;
  composerInput?: HTMLInputElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.composerInput = this.shadowRoot?.querySelector('input');
  }

  activate() {
    this.active = true;
    setTimeout(() => this.composerInput?.focus(), 150); // wait for the animation to finish
    this.composerInput?.addEventListener('blur', () => this.deactivate());
  }

  deactivate() {
    this.active = false;
  }
}
