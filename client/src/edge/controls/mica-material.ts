import {
  FASTElement,
  customElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
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
  <!-- <div id="blur"></div>
  <div id="luminosity"></div> -->
  <div id="color"></div>
  <div id="normal"></div>
`;

const styles = css`
  div {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  #image {
    background: ${desktopBackground};
    background-size: 100vw 56.25vw; /* 16:9 */
    background-position: ${(x) => x.leftOffset} ${(x) => x.topOffset};
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
export class MicaMaterial extends FASTElement {
  @attr({ attribute: 'top-offset' }) topOffset = '0px';
  @attr({ attribute: 'left-offset' }) leftOffset = '0px';
}
