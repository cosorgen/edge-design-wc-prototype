import { css, html, FASTElement, customElement } from '@microsoft/fast-element';
import { spacingHorizontalL } from '@phoenixui/themes';

const template = html<SettingEntry>` <slot></slot> `;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    min-height: 40px;
    align-items: center;
    gap: ${spacingHorizontalL};
    grid-column: span 1;

    label {
      width: 200px;
    }
  }
`;

@customElement({ name: 'setting-entry', template, styles })
export class SettingEntry extends FASTElement {}
