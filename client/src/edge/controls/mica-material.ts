import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { desktopBackground } from '../../windows/designSystem.js';
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

const styles = css<MicaMaterial>`
  :host {
    display: block;
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  div {
    position: absolute;
    inset: 0;
  }

  #image {
    background: ${desktopBackground};
    background-size: cover;
    background-position: center;
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
`;

@customElement({ name: 'mica-material', template, styles })
export class MicaMaterial extends FASTElement {}
