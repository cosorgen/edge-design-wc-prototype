import {
  FASTElement,
  observable,
  css,
  customElement,
  html,
  when,
} from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorNeutralForeground1,
  colorNeutralForeground4,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightRegular,
  lineHeightBase200,
  spacingHorizontalS,
} from '@phoenixui/web-components';
import {
  colorShellFillTaksbarItemSecondary,
  colorShellFillTaksbarItemTeritary,
} from '../designSystem.js';

export type IconCode =
  | '01'
  | '02'
  | '03'
  | '04'
  | '09'
  | '10'
  | '11'
  | '13'
  | '50';

const weatherIcons = {
  '01': 'img/windows/weather-sunny-24.svg',
  '02': 'img/windows/weather-partly-sunny-24.svg',
  '03': 'img/windows/weather-cloudy-24.svg',
  '04': 'img/windows/weather-cloudy-24.svg',
  '09': 'img/windows/weather-rain-24.svg',
  '10': 'img/windows/weather-rain-24.svg',
  '11': 'img/windows/weather-thunder-24.svg',
  '13': 'img/windows/weather-snow-24.svg',
  '50': 'img/windows/weather-mist-24.svg',
};

const template = html<WeatherWidget>`
  <button>
    ${when(
      (x) => !x.loaded,
      html`<caption-1>Loading weather...</caption-1>`,
      html` <img src="${(x) => weatherIcons[x.icon]}" />
        <div>
          <caption-1>${(x) => x.temp}ºF</caption-1>
          <caption-1>${(x) => x.condition}</caption-1>
        </div>`,
    )}
  </button>
`;

const styles = css`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${spacingHorizontalS};
    user-select: none;
    padding: 0 ${spacingHorizontalS};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;

    & div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
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

    &:nth-of-type(2) {
      color: ${colorNeutralForeground4};
    }
  }
`;

@customElement({
  name: 'weather-widget',
  template,
  styles,
})
export default class WeatherWidget extends FASTElement {
  @observable temp: number = 0;
  @observable condition: string = '';
  @observable icon: IconCode = '01';
  @observable loaded = false;

  connectedCallback() {
    super.connectedCallback();

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `http://localhost:4000/api/weather?lat=${latitude}&lon=${longitude}`,
      )
        .then((res) => res.json())
        .then((data) => {
          this.temp = data.temp;
          this.condition = data.condition;
          this.icon = data.icon;
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
