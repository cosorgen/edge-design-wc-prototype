import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';

const template = html`<slot></slot>`;

const styles = css`
  .bold {
    font-weight: bold;
  }
`;

@customElement({ name: 'copilot-chat-entry', template, styles })
export class CopilotChatEntry extends FASTElement {
  @attr({ mode: 'boolean' }) bot = false;
}
