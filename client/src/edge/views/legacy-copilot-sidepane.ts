import EdgeWindowService from '#servicesedgeWindowService.js';
import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  colorNeutralCardBackground,
  colorNeutralForeground1,
  spacingHorizontalM,
  spacingVerticalM,
  spacingVerticalXXL,
} from '@mai-ui/phoenix-theme';
import '../controls/sidepane-header.js';
import '../controls/copilot-design-provider.js';
import './copilot-composer.js';
import { backgroundGradient } from '../copilotDesignSystem.js';

const template = html`
  <copilot-design-provider>
    <div id="content">
      <div class="user message">Create a summary for this page</div>
      <div class="bot message">
        Here are the key points about the Boox Palma from the article:<br /><br />

        <b>Smartphone-Sized E-Reader:</b> The Boox Palma is a compact e-reader
        with a 6.1-inch E Ink screen, running Android, and capable of
        downloading apps from the Play Store.<br /><br />

        <b>Battery Life and Usability:</b> Its E Ink screen ensures a battery
        life of 4-7 days and makes it ideal for reading, though it’s not great
        for video or high-refresh activities.<br /><br />

        <b>Enhanced Reading Experience:</b> Users appreciate its ability to
        reduce distractions, making it easier to focus on reading and listening
        to music or podcasts. <br /><br />

        <b>Limitations:</b> The device has some hardware and software
        limitations, including a plastic body, outdated Android version, and
        occasional screen responsiveness issues.
      </div>
    </div>
    <copilot-composer></copilot-composer>
  </copilot-design-provider>
  <sidepane-header @close="${(x) => x.handleClose()}">Copilot</sidepane-header>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    color: ${colorNeutralForeground1};
  }

  copilot-design-provider {
    position: absolute;
    inset: 0;
    background: linear-gradient(${backgroundGradient});
    padding-block-start: 50px; /* Account for the sidepane header */
    padding-block-end: 120px; /* Account for the composer */
  }

  #content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
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
    bottom: ${spacingVerticalM};
    inset-inline: ${spacingHorizontalM};
  }

  .user {
    background-color: ${colorNeutralCardBackground};
    padding: 14px 20px;
    width: fit-content;
    border-radius: 12px;
    align-self: flex-end;
  }
`;

@customElement({
  name: 'legacy-copilot-sidepane',
  template,
  styles,
})
export class LegacyCopilotSidepane extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;

  handleClose = () => {
    this.ews.closeSidepaneApp();
  };
}
