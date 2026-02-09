import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
  observable,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { TabService } from '#servicestabService.js';
import EdgePermissionsService from '#servicespermissionsService.js';
import '../controls/media-prompt.js';
import '../controls/microphone-permission-card.js';
import MicrophonePermissionCard from '../controls/microphone-permission-card.js';

const template = html<MicrophonePermissionPrompt>`
  <media-prompt>
    <span slot="title">
      ${(x) => new URL(x.ts.tabsById[x.ts.activeTabId!].url).hostname} wants to
    </span>
    <svg>
      <use href="img/edge/icons.svg#mic-20-regular" />
    </svg>
    Use available microphones (${(x) => x.micCard?.mics.length})
    <span slot="cards">
      <microphone-permission-card></microphone-permission-card>
    </span>
  </media-prompt>
`;

const styles = css``;

@customElement({ name: 'microphone-permission-prompt', template, styles })
export default class MicrophonePermissionPrompt extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  @inject(TabService) ts!: TabService;
  @inject(EdgePermissionsService) ps!: EdgePermissionsService;
  @observable micCard?: MicrophonePermissionCard;

  openChanged() {
    if (this.open) {
      this.micCard?.updateMicList();
      this.micCard?.openMicFeed();
    } else {
      this.micCard?.closeMicFeed();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
  }

  setElements() {
    this.micCard = this.shadowRoot!.querySelector(
      'microphone-permission-card',
    )!;
  }

  addEventListeners() {
    // Prevent clicks from opening the omnibox.
    this.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    this.addEventListener('allow', () => this.ps.grantMicrophoneAccess(true));
    this.addEventListener('allowOnce', () =>
      this.ps.grantMicrophoneAccess(false),
    );
    this.addEventListener('block', () => {
      this.ps.denyMicrophoneAccess();
      this.micCard?.closeMicFeed();
    });
  }
}
