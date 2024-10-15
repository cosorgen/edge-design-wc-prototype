import {
  FASTElement,
  customElement,
  html,
  css,
  attr,
  nullableNumberConverter,
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
  @attr({ converter: nullableNumberConverter }) top = 0;
  @attr({ converter: nullableNumberConverter }) left = 0;

  connectedCallback(): void {
    super.connectedCallback();

    // Set event listener for window resize
    window.addEventListener('resize', this.resizeBackgroundImage);

    window.requestAnimationFrame(() => {
      // Set initial background image position
      const imageElement = this.shadowRoot?.getElementById('image');
      if (imageElement) {
        const { top, left } = imageElement.getBoundingClientRect();
        this.top = top;
        this.left = left;
        this.resizeBackgroundImage();
      }
    }); // needed for bounding client rect
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.resizeBackgroundImage);
  }

  resizeBackgroundImage = () => {
    const imageElement = this.shadowRoot?.getElementById('image');
    if (imageElement) {
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
      imageElement.style.backgroundSize = `${newWidth}px ${newHeight}px`;
      imageElement.style.backgroundPosition = `${(width - newWidth) / 2 - this.left}px ${(height - newHeight) / 2 - this.top}px`;
    }
  };

  topChanged() {
    if (this.$fastController.isConnected) {
      this.resizeBackgroundImage();
    }
  }

  leftChanged() {
    if (this.$fastController.isConnected) {
      this.resizeBackgroundImage();
    }
  }
}
