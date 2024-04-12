import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
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

  :host([appearance='tabBar']) #blur {
    backdrop-filter: blur(calc(${tabBarBackgroundBlur} / 2));
  }

  #luminosity {
    background: ${tabActiveBackgroundLuminosity};
    mix-blend-mode: luminosity;
  }

  :host([appearance='tabBar']) #luminosity {
    background: ${tabBarBackgroundLuminosity};
  }

  #color {
    background: ${tabActiveBackgroundColor};
    mix-blend-mode: color;
  }

  :host([appearance='tabBar']) #color {
    background: ${tabBarBackgroundColor};
  }

  #normal {
    background: ${tabActiveBackgroundNormal};
  }

  :host([appearance='tabBar']) #normal {
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
  private resizeBackgroundImage(): void {
    const imageElement = this.shadowRoot?.getElementById('image');
    if (imageElement) {
      const { innerWidth: width, innerHeight: height } = window;
      const { top, left } = imageElement.getBoundingClientRect();
      console.log(width, height, top, left);
      const aspectRatio = width / height;
      let newWidth = width;
      let newHeight = height;

      const imageAspectRatio = 16 / 9;
      if (imageAspectRatio < aspectRatio) {
        newHeight = width / imageAspectRatio;
      } else {
        newWidth = height * imageAspectRatio;
      }
      imageElement.style.backgroundSize = `${newWidth}px ${newHeight}px`;
      imageElement.style.backgroundPosition = `${(width - newWidth) / 2 - left}px ${(height - newHeight) / 2 - top}px`;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resizeBackgroundImage();
    window.requestAnimationFrame(() => this.resizeBackgroundImage()); // needed for bounding client rect
    window.addEventListener('resize', this.resizeBackgroundImage.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.resizeBackgroundImage.bind(this));
  }
}
