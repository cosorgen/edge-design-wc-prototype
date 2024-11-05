import {
    customElement,
    FASTElement,
    html,
    css,
    Observable,
  } from '@microsoft/fast-element';
  import { inject } from '@microsoft/fast-element/di.js';
  import {
    acrylicBackgroundBlur,
    acrylicBackgroundLuminosity,
    borderRadiusLayerFlyout,
    colorNeutralForeground1,
    shadow28,
  } from '@phoenixui/themes';
  import WindowsService from '#services/windowsService.js';
  
  const template = html<IdentityMenu>`
    <div>
      <img
        src="${(x) => x.getImageSource()}"
        alt="Identity Icon"
        class="identity-image"
      />
    </div>
  `;
  
  const styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 318px;
      height: 373px;
      background: ${acrylicBackgroundLuminosity};
      backdrop-filter: blur(${acrylicBackgroundBlur});
      border-radius: ${borderRadiusLayerFlyout};
      box-shadow: ${shadow28};
      color: ${colorNeutralForeground1};
      overflow: hidden;
    }
  
    .identity-image {
      width: 100%;
    }
  `;
  
  @customElement({ name: 'identity-flyout', template, styles })
  export class IdentityMenu extends FASTElement {
    @inject(WindowsService) ws!: WindowsService;
  
    connectedCallback() {
      super.connectedCallback();
      Observable.getNotifier(this.ws).subscribe(this);
    }
  
    disconnectedCallback() {
      Observable.getNotifier(this.ws).unsubscribe(this);
      super.disconnectedCallback();
    }
  
    handleChange(_: unknown, property: string) {
      if (property === 'theme') {
        this.$emit('theme-change');
      }
    }
  
    getImageSource() {
      return this.ws.theme === 'dark'
        ? './img/edge/identity-dark.png'
        : './img/edge/identity-light.png';
    }
  }
  