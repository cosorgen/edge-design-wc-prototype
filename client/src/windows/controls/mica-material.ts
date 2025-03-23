import {
  FASTElement,
  customElement,
  html,
  css,
  observable,
  attr,
} from '@microsoft/fast-element';
import {
  tabActiveBackgroundBlur,
  tabActiveBackgroundLuminosity,
  tabActiveBackgroundColor,
  tabActiveBackgroundNormal,
  tabBarBackgroundBlur,
  tabBarBackgroundLuminosity,
  tabBarBackgroundColor,
  tabBarBackgroundNormal,
  desktopBackground,
} from '@edge-design/windows-theme';

const template = html<MicaMaterial>`
  <div id="image"></div>
  <div id="blur"></div>
  <div id="luminosity"></div>
  <div id="color"></div>
  <div id="normal"></div>
`;

const styles = css`
  :host {
    display: block;
    position: absolute;
    inset: 0;
    backdrop-filter: blur(0px); /* Fix for overflow: hidden; */
  }

  div {
    position: absolute;
    inset: 0;
  }

  #image {
    inset-block-start: ${(x) => `${x.imgRect.top}px`};
    inset-inline-start: ${(x) => `${x.imgRect.left}px`};
    width: ${(x) => `${x.imgRect.width}px`};
    height: ${(x) => `${x.imgRect.height}px`};
    background: ${desktopBackground};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  #blur {
    backdrop-filter: blur(calc(${tabActiveBackgroundBlur} / 2));
  }

  :host([tab-bar]) #blur {
    backdrop-filter: blur(calc(${tabBarBackgroundBlur} / 2));
  }

  #luminosity {
    background: ${tabActiveBackgroundLuminosity};
    mix-blend-mode: luminosity;
  }

  :host([tab-bar]) #luminosity {
    background: ${tabBarBackgroundLuminosity};
  }

  #color {
    background: ${tabActiveBackgroundColor};
    mix-blend-mode: color;
  }

  :host([tab-bar]) #color {
    background: ${tabBarBackgroundColor};
  }

  #normal {
    background: ${tabActiveBackgroundNormal};
  }

  :host([tab-bar]) #normal {
    background: ${tabBarBackgroundNormal};
  }

  :host([image-only]) #blur,
  :host([image-only]) #luminosity,
  :host([image-only]) #color,
  :host([image-only]) #normal {
    backdrop-filter: none;
    background: none;
    mix-blend-mode: normal;
  }
`;

@customElement({ name: 'mica-material', template, styles })
export class MicaMaterial extends FASTElement {
  @attr({ mode: 'boolean', attribute: 'image-only' }) imageOnly = false;
  @attr({ mode: 'boolean', attribute: 'tab-bar' }) tabBar = false;
  @attr({ mode: 'boolean', attribute: 'full-fps' }) fullFPS = false;
  @observable imgRect = { top: 0, left: 0, width: 0, height: 0 };
  _frameCount = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateCoordinates();
  }

  updateCoordinates = () => {
    if (!this.fullFPS) {
      // Skip frames to reduce CPU usage
      if (this._frameCount !== 5) {
        this._frameCount++;
        requestAnimationFrame(this.updateCoordinates);
        return;
      }
      this._frameCount = 0;
    }

    const { top: thisTop, left: thisLeft } = this.getBoundingClientRect();
    const top = -1 * thisTop;
    const left = -1 * thisLeft;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (
      this.imgRect.top === top &&
      this.imgRect.left === left &&
      this.imgRect.width === width &&
      this.imgRect.height === height
    ) {
      requestAnimationFrame(this.updateCoordinates);
      return;
    }

    this.imgRect = { top, left, width, height };
    requestAnimationFrame(this.updateCoordinates);
  };
}
