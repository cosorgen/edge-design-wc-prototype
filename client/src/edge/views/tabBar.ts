import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import {
  spacingHorizontalXS,
  spacingVerticalXXS,
  spacingHorizontalS,
  tabBarBackgroundBlur,
  tabBarBackgroundLuminosity,
  spacingVerticalSNudge,
  tabBarBackgroundColor,
  tabBarBackgroundNormal,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/identityControl.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '../../services/windowsService.js';

const template = html<TabBar>`
  <div class="material-layer" id="image"></div>
  <div class="material-layer" id="blur"></div>
  <div class="material-layer" id="luminosity"></div>
  <div class="material-layer" id="color"></div>
  <div class="material-layer" id="normal"></div>
  <div id="content">
    <div class="group">
      <identity-control></identity-control>
    </div>
    <div class="group">
      <phx-button appearance="subtle" icon-only>
        <svg>
          <use href="img/edge/icons.svg#layer-diagonal-20-regular"></use>
        </svg>
      </phx-button>
      <phx-button appearance="subtle" icon-only>
        <svg>
          <use
            href="img/edge/icons.svg#tab-position-horizontal-20-regular"
          ></use>
        </svg>
      </phx-button>
    </div>
  </div>
`;

const styles = css`
  :host {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .material-layer {
    position: absolute;
    inset: 0;
  }

  #image {
    width: 100vw;
    height: 100vh;
    background: ${(x) =>
      x.ws.theme === 'dark'
        ? 'url(img/windows/desktopDark.jpg)'
        : 'url(img/windows/desktopLight.jpg)'};
    background-size: cover;
    background-position: center;
  }

  #blur {
    backdrop-filter: blur(calc(${tabBarBackgroundBlur} / 2));
  }

  #luminosity {
    background-color: ${tabBarBackgroundLuminosity};
    mix-blend-mode: luminosity;
  }

  #color {
    background-color: ${tabBarBackgroundColor};
    mix-blend-mode: color;
  }

  #normal {
    background-color: ${tabBarBackgroundNormal};
  }

  #content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${spacingHorizontalS};
    padding-inline: ${spacingHorizontalXS};
    padding-block-start: ${spacingVerticalSNudge};
    padding-block-end: ${spacingVerticalXXS};
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }
`;

@customElement({
  name: 'tab-bar',
  template,
  styles,
})
export class TabBar extends FASTElement {
  @inject(WindowsService) ws!: WindowsService; // for theme

  connectedCallback() {
    super.connectedCallback();
    this.positionMicaLayers();
  }

  positionMicaLayers() {
    const imgEl = this.shadowRoot!.getElementById('image') as HTMLElement;
    const { top, left } = imgEl.getBoundingClientRect();
    imgEl.style.top = `-${top}px`;
    imgEl.style.left = `-${left}px`;
  }
}
