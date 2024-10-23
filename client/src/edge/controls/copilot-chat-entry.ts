import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralCardBackground,
  colorNeutralForeground1,
  spacingVerticalS,
  typographyStyles,
} from '@phoenixui/themes';

const template = html`<div id="message"><slot></slot></div>`;

const styles = css`
  :host {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #message {
    display: flex;
    flex-direction: column;
    padding: ${spacingVerticalS};
    border-radius: ${borderRadiusMedium};
    background: ${colorNeutralCardBackground};
    max-width: 80%;
    align-self: flex-end;

    font-family: ${typographyStyles.body2.fontFamily};
    font-size: ${typographyStyles.body2.fontSize};
    line-height: ${typographyStyles.body2.lineHeight};
    font-weight: ${typographyStyles.body2.fontWeight};
    color: ${colorNeutralForeground1};
  }

  :host([system]) #message {
    background: transparent;
    align-self: flex-start;
    padding: 0;
  }

  :host([inline]) #message {
    max-width: none;
  }
`;

@customElement({ name: 'copilot-chat-entry', template, styles })
export class CopilotChatEntry extends FASTElement {
  @attr({ mode: 'boolean' }) system = false;
  @attr({ mode: 'boolean' }) inline = false;
}
