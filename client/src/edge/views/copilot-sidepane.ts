import EdgeWindowService from '#servicesedgeWindowService.js';
import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { spacingHorizontalXXL, spacingVerticalXXL } from '@phoenixui/themes';
import '../controls/sidepane-header.js';
import '../controls/copilot-composer.js';

const template = html`
  <sidepane-header>Copilot</sidepane-header>
  <div id="content">
    <div class="user message">Create a summary for this page</div>
    <div class="bot message">
      Here are the key points about the Boox Palma from the article:<br /><br />

      <b>Smartphone-Sized E-Reader:</b> The Boox Palma is a compact e-reader
      with a 6.1-inch E Ink screen, running Android, and capable of downloading
      apps from the Play Store.<br /><br />

      <b>Battery Life and Usability:</b> Its E Ink screen ensures a battery life
      of 4-7 days and makes it ideal for reading, though it’s not great for
      video or high-refresh activities.<br /><br />

      <b>Enhanced Reading Experience:</b> Users appreciate its ability to reduce
      distractions, making it easier to focus on reading and listening to music
      or podcasts. <br /><br />

      <b>Limitations:</b> The device has some hardware and software limitations,
      including a plastic body, outdated Android version, and occasional screen
      responsiveness issues.
    </div>
  </div>
  <copilot-composer placeholder="Message Copilot">
    <phx-button appearance="subtle" size="large" icon-only slot="start">
      <svg>
        <use x="2px" y="2px" href="img/edge/icons.svg#history-20-regular" />
      </svg>
    </phx-button>
    <phx-button appearance="subtle" size="large" icon-only slot="end">
      <svg>
        <use x="2px" y="2px" href="img/edge/icons.svg#mic-new-20-regular" />
      </svg>
    </phx-button>
  </copilot-composer>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      180deg,
      #fcf9f6 0%,
      #fcf9f6 60%,
      #fbebe0 99%,
      #fde5cd 100%
    );
  }

  #content {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: ${spacingVerticalXXL};
    min-height: 0px;
    gap: ${spacingVerticalXXL};
    overflow-y: auto;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  copilot-composer {
    position: absolute;
    bottom: ${spacingVerticalXXL};
    inset-inline: ${spacingHorizontalXXL};
  }

  .user {
    background-color: #fee5ce;
    padding: 14px 20px;
    width: fit-content;
    border-radius: 12px;
    align-self: flex-end;
  }
`;

@customElement({
  name: 'copilot-sidepane',
  template,
  styles,
})
export class CopilotSidepane extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
  }

  addEventListeners() {
    this.addEventListener('close', () => this.ews.closeSidepaneApp());
  }
}
