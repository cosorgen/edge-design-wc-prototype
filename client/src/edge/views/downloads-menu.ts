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
  
  const template = html<DownloadsMenu>`
    <div>
      <img
        src="${(x) => x.getImageSource()}"
        alt="Download Icon"
        class="download-image"
      />
    </div>
  `;
  
  const styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 368px;
      height: 298px;
      background: ${acrylicBackgroundLuminosity};
      backdrop-filter: blur(${acrylicBackgroundBlur});
      border-radius: ${borderRadiusLayerFlyout};
      box-shadow: ${shadow28};
      color: ${colorNeutralForeground1};
      overflow: hidden;
    }
  
    .download-image {
      width: 100%;
    }
  `;
  
  @customElement({ name: 'downloads-menu', template, styles })
  export class DownloadsMenu extends FASTElement {
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
        ? './img/edge/download-dark.png'
        : './img/edge/download-light.png';
    }
  }
  