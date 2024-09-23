import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { desktopBackground } from '../designSystem.js';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  acrylicBackgroundColor,
  acrylicBackgroundNormal,
} from '@phoenixui/themes';

const template = html<AcrylicMaterial>`
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
    backdrop-filter: blur(calc(${acrylicBackgroundBlur} / 2));
  }

  #luminosity {
    background: ${acrylicBackgroundLuminosity};
    mix-blend-mode: luminosity;
  }

  #color {
    background: ${acrylicBackgroundColor};
    mix-blend-mode: color;
  }

  #normal {
    background: ${acrylicBackgroundNormal};
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

@customElement({ name: 'acrylic-material', template, styles })
export class AcrylicMaterial extends FASTElement {
  private resizeBackgroundImage(): void {
    const imageElement = this.shadowRoot?.getElementById('image');
    if (imageElement) {
      const { innerWidth: width, innerHeight: height } = window;
      const { top, left } = imageElement.getBoundingClientRect();
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
