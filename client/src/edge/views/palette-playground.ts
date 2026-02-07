import {
  css,
  FASTElement,
  html,
  customElement,
  attr,
} from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import {
  backgroundWebPageSecondary,
  foregroundContentNeutralPrimary,
} from '@mai-ui/design-tokens/tokens.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgePermissionsService from '#servicespermissionsService.js';

const template = html<PalettePlayground>`
  <div class="group">
    <h1>Permission Playground</h1>
    <div id="controls">
      <mai-button
        aria-pressed="${(x) =>
          x.ps.permissions.camera.state === 'active' ? 'true' : 'false'}"
        @click="${(x) => x.ps.requestCameraAccess()}"
      >
        Camera
        (${(x) =>
          x.ps.permissions.camera.permission === 'block'
            ? 'blocked'
            : x.ps.permissions.camera.state})
      </mai-button>
      <mai-button
        aria-pressed="${(x) =>
          x.ps.permissions.microphone.state === 'active' ? 'true' : 'false'}"
        @click="${(x) => x.ps.requestMicrophoneAccess()}"
      >
        Microphone
        (${(x) =>
          x.ps.permissions.microphone.permission === 'block'
            ? 'blocked'
            : x.ps.permissions.microphone.state})
      </mai-button>
    </div>
  </div>
`;

const styles = css`
  :host {
    box-sizing: border-box;
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 64px;
    padding: 24px;
    width: 100%;
    height: fit-content;
    min-height: 100%;
    background-color: ${backgroundWebPageSecondary};
    color: ${foregroundContentNeutralPrimary};
  }

  :host([active]) {
    display: flex;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h2 {
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
`;

@customElement({ name: 'palette-playground', template, styles })
export class PalettePlayground extends FASTElement {
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @attr({ mode: 'boolean' }) active = false;
}
