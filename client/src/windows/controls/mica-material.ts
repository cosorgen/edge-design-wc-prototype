import {
  FASTElement,
  customElement,
  html,
  css,
  Updates,
} from '@microsoft/fast-element';
import { desktopBackground } from '../designSystem.js';
import {
  tabActiveBackgroundBlur,
  tabActiveBackgroundLuminosity,
  tabActiveBackgroundColor,
  tabActiveBackgroundNormal,
  tabBarBackgroundBlur,
  tabBarBackgroundLuminosity,
  tabBarBackgroundColor,
  tabBarBackgroundNormal,
} from '@phoenixui/themes';

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
    backdrop-filter: blur(0px); /* Fix for overflow:hidden */
  }

  div {
    position: absolute;
    inset: 0;
  }

  #image {
    background: ${desktopBackground};
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top left;
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
  _imageElement?: HTMLDivElement;
  _top = 0;
  _left = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();

    Updates.enqueue(() => {
      // Set initial background image position
      if (this._imageElement) {
        const { top, left } = this._imageElement.getBoundingClientRect();
        this._top = top;
        this._left = left;
        this.resizeBackgroundImage();
      }
    }); // needed for bounding client rect
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.unsetElements();
  }

  setElements() {
    this._imageElement = this.shadowRoot?.getElementById(
      'image',
    ) as HTMLDivElement;
  }

  unsetElements() {
    this._imageElement = undefined;
  }

  addEventListeners() {
    // TODO: Update background image on move or resize
  }

  removeEventListeners() {

  }

  resizeBackgroundImage = () => {
    if (this._imageElement) {
      const { innerWidth: width, innerHeight: height } = window;
      const aspectRatio = width / height;
      let newWidth = width;
      let newHeight = height;

      const imageAspectRatio = 16 / 9;
      if (imageAspectRatio < aspectRatio) {
        newHeight = width / imageAspectRatio;
      } else {
        newWidth = height * imageAspectRatio;
      }
      this._imageElement.style.backgroundSize = `${newWidth}px ${newHeight}px`;
      this._imageElement.style.backgroundPosition = `${(width - newWidth) / 2 - this._left}px ${(height - newHeight) / 2 - this._top}px`;
    }
  };
}
