import {
    customElement,
    FASTElement,
    html,
    css,
    Observable,
  } from '@microsoft/fast-element';
  import { inject } from '@microsoft/fast-element/di.js';
  import WindowsService from '#services/windowsService.js';
  
  const template = html<SettingsPage>`
    <div>
      <img
        src="${(x) => x.getImageSource()}"
        alt="Settings Page"
        class="settings-image"
      />
    </div>
  `;
  
  const styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%; /* Ensure it takes full height */
      overflow: auto; /* Enable scrolling */
    }
  
    .settings-image {
      width: 100%; /* Fill the width */
      height: auto; /* Maintain aspect ratio */
      object-fit: contain;
    }
  `;
  
  @customElement({ name: 'settings-page', template, styles })
  export class SettingsPage extends FASTElement {
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
        ? './img/edge/settings-dark.png'
        : './img/edge/settings-light.png';
    }
  }
  