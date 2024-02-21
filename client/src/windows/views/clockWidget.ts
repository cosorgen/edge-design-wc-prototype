import {
  FASTElement,
  attr,
  css,
  customElement,
  html,
} from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightRegular,
  lineHeightBase200,
  spacingHorizontalS,
} from '@phoenixui/themes';
import {
  colorShellFillTaksbarItemSecondary,
  colorShellFillTaksbarItemTeritary,
} from '../designSystem.js';

const template = html<ClockWidget>`
  <button>
    <caption-1>${(x) => x.time}</caption-1>
    <caption-1>${(x) => x.date}</caption-1>
  </button>
`;

const styles = css`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    user-select: none;
    padding: 0 ${spacingHorizontalS};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
  }
  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }
  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
  caption-1 {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    white-space: nowrap;
    color: ${colorNeutralForeground1};
  }
`;

@customElement({
  name: 'clock-widget',
  template,
  styles,
})
export default class ClockWidget extends FASTElement {
  @attr time = this.formatTime();
  @attr date = this.formatDate();

  connectedCallback() {
    super.connectedCallback();

    const timeNow = new Date().getSeconds();
    const timeUntilNextMinute = 60 - timeNow;
    setTimeout(() => {
      this.time = this.formatTime();
      this.date = this.formatDate();
      setInterval(() => {
        this.time = this.formatTime();
        this.date = this.formatDate();
      }, 60000);
    }, timeUntilNextMinute * 1000);
  }

  formatTime() {
    return new Date().toLocaleTimeString().replace(/:\d+\s/, ' '); // remove seconds
  }

  formatDate() {
    return new Date().toLocaleDateString();
  }
}
