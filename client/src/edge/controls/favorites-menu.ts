import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerFlyout,
  shadow28,
} from '@phoenixui/themes';

const template = html<FavoritesMenu>` <img
  src="./img/edge/favorites.png"
  width="368px"
  height="600px"
/>`;

const styles = css`
  :host {
    display: block;
    min-width: 200px;
    min-height: 200px;
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
  }
`;

@customElement({
  name: 'favorites-menu',
  template,
  styles,
})
export class FavoritesMenu extends FASTElement {}
