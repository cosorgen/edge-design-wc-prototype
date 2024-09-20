import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorScrollbarForeground,
  colorScrollbarForegroundHover,
  spacingVerticalXS,
} from '@phoenixui/themes';

const template = html<CopilotComposer>``;

const styles = css`
  :host {
    display: block;
    width: 100%;
    max-width: 160px;
    height: ${spacingVerticalXS};
    background-color: ${colorScrollbarForeground};
    border-radius: ${borderRadiusCircular};
    cursor: pointer;

    transition: all linear 0.2s;
  }

  :host(:hover) {
    background-color: ${colorScrollbarForegroundHover};
  }
`;

@customElement({
  name: 'copilot-composer',
  template,
  styles,
})
export class CopilotComposer extends FASTElement {}
