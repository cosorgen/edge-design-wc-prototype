import {
  css,
  customElement,
  FASTElement,
  html,
  observable,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerFlyout,
  curveDecelerateMax,
  durationFast,
  shadow28,
} from '@phoenixui/themes';

const template = html<FavoritesMenu>`<div
    id="click-catcher"
    @click="${(x) => x.handleDismiss()}"
  ></div>
  <slot name="trigger"></slot>
  <div id="content" ?active="${(x) => x.active}">
    <img src="/img/edge/favorites.png" width="368px" height="600px" />
  </div>`;

const styles = css`
  :host {
    position: relative;
  }

  #click-catcher {
    position: fixed;
    inset: 0;
  }

  #content {
    position: absolute;
    min-width: 200px;
    min-height: 200px;
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
    inset-inline-end: 0px;
    inset-block-start: 100%;

    transform: translateY(-24px);
    opacity: 0;
    transition: all ${durationFast} ${curveDecelerateMax};
  }

  #content[active] {
    transform: translateY(0);
    opacity: 1;
  }
`;

@customElement({
  name: 'favorites-menu',
  template,
  styles,
})
export class FavoritesMenu extends FASTElement {
  @observable active = false;

  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.active = true;
    }, 1); // dunno why this is necessary
  }

  handleDismiss() {
    const content = this.shadowRoot?.getElementById('content');
    if (content) {
      const transitionEnd = () => {
        this.$emit('favoritesdismiss');
        content.removeEventListener('transitionend', transitionEnd);
      };
      content.addEventListener('transitionend', transitionEnd);
    }

    this.active = false;
  }
}
