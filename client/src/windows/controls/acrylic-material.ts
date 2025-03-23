import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundColor,
  acrylicBackgroundLuminosity,
  acrylicBackgroundNormal,
} from '@edge-design/windows-theme';

const template = html<AcrylicMaterial>`
  <div id="luminosity"></div>
  <div id="color"></div>
  <div id="normal"></div>
`;

const styles = css`
  :host {
    display: block;
    position: absolute;
    inset: 0;
    backdrop-filter: blur(calc(${acrylicBackgroundBlur} / 2));
  }

  div {
    position: absolute;
    inset: 0;
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
`;

@customElement({ name: 'acrylic-material', template, styles })
export class AcrylicMaterial extends FASTElement {}
