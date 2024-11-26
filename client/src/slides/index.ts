import {
  css,
  html,
  FASTElement,
  customElement,
  observable,
} from '@microsoft/fast-element';
import '../windows/controls/mica-material.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';

const template = html<FigmaSlidesElement>`
  <mica-material
    top="${(x) => x.ws.getWindowById(x.id)?.yPos}"
    left="${(x) => x.ws.getWindowById(x.id)?.xPos}"
  ></mica-material>
  <div id="content">
    <div id="body">
    <iframe 
        style="border: 1px solid rgba(0, 0, 0, 0.1);" 
        width="100%" 
        height="100%" 
        src="https://embed.figma.com/proto/7oYu0FjQZgK7ftbHzYPIA2/Aurora-Mustafa-TPA?node-id=412-11751&node-type=canvas&scaling=scale-fit&content-scaling=fixed&page-id=33%3A4917&embed-host=share&hide-ui=true" 
        allowfullscreen
        sandbox="allow-scripts allow-same-origin"
    >
    </iframe>
    </div>
  </div>
`;

const styles = css`
  #content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
  }

  #body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

@customElement({ name: 'figma-slides', template, styles })
export class FigmaSlidesElement extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;

  @observable windowMaximized = false; // Track the maximized state of the window

  windowIsMaximized() {
    return this.ws.getWindowById(this.id)?.maximized || false;
  }

  maximizeWindow() {
    const isMaximized = !this.windowIsMaximized();
    this.ws.maximizeWindow(this.ws.activeWindowId, isMaximized);
    this.windowMaximized = isMaximized; // Update local state
  }
  
  minimizeWindow() {
    this.ws.minimizeWindow(this.ws.activeWindowId);
    this.windowMaximized = false;
  }
  

  closeWindow() {
    console.log('Window closed');
    this.ws.closeWindow(this.id);
  } 

  connectedCallback() {
    super.connectedCallback();
    this.maximizeWindow();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
