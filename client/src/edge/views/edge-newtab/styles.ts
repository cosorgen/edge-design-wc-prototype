import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorNeutralCardBackground,
  colorNeutralForegroundStaticInverted,
  colorNeutralStroke1,
  strokeWidthThin,
  typographyStyles,
  borderRadiusLarge,
  colorBrandForeground1,
  colorNeutralForegroundHint,
  colorNeutralStroke2,
  colorStrokeFocus1,
  colorStrokeFocus2,
  strokeWidthThick,
  borderRadiusMedium,
  colorNeutralForeground1Static,
} from '@mai-ui/kumo-theme';

const smtcCornerCardRest = `var(--smtc-corner-card-rest, ${borderRadiusLarge})`;
const smtcCornerImageInCardRest = `var(--smtc-corner-image-in-card-rest, ${borderRadiusMedium})`;

export const styles = css`
  :host {
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
  }

  #content {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: fit-content;
    min-height: 100%;
    padding: 40px;
  }

  #background {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--viewport-width);
    height: var(--viewport-height);
    background: linear-gradient(180deg, #ffffff80 0%, white 100%),
      url('img/edge/newtab2/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }

  mai-button#settings {
    position: absolute;
    top: 32px;
    right: 32px;
  }

  #content-header {
    position: absolute;
    bottom: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  #top-sites {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }

  #widgets {
    position: absolute;
    top: calc(100% - 260px - 40px);
    height: 260px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1298px;
  }

  #widgets-header {
    width: 100%;

    h2 {
      margin: 0;
      font-family: ${typographyStyles.title3.fontFamily};
      font-size: ${typographyStyles.title3.fontSize};
      font-weight: ${typographyStyles.title3.fontWeight};
      line-height: ${typographyStyles.title3.lineHeight};
      color: ${colorNeutralForeground1Static};
    }
  }

  #widgets-content {
    display: flex;
    flex-direction: row;
    gap: 20px;
    height: 100%;
    max-height: 174px;
  }

  .card {
    flex: 1;
    height: 100%;
    border-radius: ${smtcCornerCardRest};
    padding: 16px;
    overflow: hidden;
  }

  .card#msn {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    background: linear-gradient(
        0deg,
        #ff314ce5 10%,
        #ff314c99 40%,
        #ff314c1a 90%
      ),
      url('img/edge/newtab2/msnBackground.png');
    background-size: cover, cover;
    background-position: center, center;
    background-repeat: no-repeat, no-repeat;
    color: ${colorNeutralForegroundStaticInverted};
  }

  .card#msn h3 {
    margin: 0;
    margin-bottom: 6px;
    font-size: ${typographyStyles.title3.fontSize};
    font-weight: ${typographyStyles.title3.fontWeight};
    line-height: ${typographyStyles.title3.lineHeight};
  }

  #msn-content {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }

  #msn-content svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  #msn-content p {
    flex: 1;
    margin: 0;
    font-size: ${typographyStyles.body2.fontSize};
    font-weight: ${typographyStyles.body2.fontWeight};
    line-height: ${typographyStyles.body2.lineHeight};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card#todo {
    background: ${colorNeutralCardBackground};
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
    display: flex;
    flex-direction: column;
  }

  #todo-header {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }

  #todo-header img {
    width: 16px;
    height: 16px;
  }

  #todo-header h4 {
    margin: 0;
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: ${typographyStyles.body1Strong.lineHeight};
  }

  #todo-list {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .todo-item {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    padding: 10px;
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStroke1};
  }

  .todo-checkbox {
    line-height: 0;
    cursor: pointer;
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-radius: ${borderRadiusCircular};
  }

  .todo-checkbox:has(input:checked) {
    background: ${colorBrandForeground1};
    border-color: transparent;
  }

  .todo-checkbox:has(input:focus-visible) {
    border: ${strokeWidthThin} solid ${colorStrokeFocus1};
    outline: ${strokeWidthThick} solid ${colorStrokeFocus2};
  }

  .todo-checkbox input {
    opacity: 0;
  }

  .todo-info {
    width: 100%;
    overflow: hidden;
  }

  .todo-title,
  .toto-subtitle {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .todo-title {
    font-size: ${typographyStyles.body2.fontSize};
    font-weight: ${typographyStyles.body2.fontWeight};
    line-height: ${typographyStyles.body2.lineHeight};
  }

  .todo-subtitle {
    display: flex;
    flex-direction: row;
    gap: 6px;

    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
    color: ${colorNeutralForegroundHint};
  }

  .todo-due-date.today {
    color: ${colorBrandForeground1};
  }

  .card#weather {
    display: flex;
    flex-direction: column;
    border-radius: ${smtcCornerCardRest};
    background: url(img/edge/newtab2/weatherBackground.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: ${colorNeutralForegroundStaticInverted};
  }

  #weather-header {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
  }

  #weather-header h4 {
    margin: 0;
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
  }

  #weather-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #weather-today {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    overflow: hidden;
  }

  #weather-icon,
  #weather-icon img {
    width: 80px;
    height: 80px;
  }

  #weather-temperature {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  #weather-temperature h1 {
    margin: 0;
    font-size: ${typographyStyles.display.fontSize};
    font-weight: ${typographyStyles.display.fontWeight};
    line-height: 72px;
  }

  #weather-temperature p {
    margin: 0;
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
  }

  #weather-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  #weather-details p {
    margin: 0;
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
  }

  #weather-details p:first-child {
    margin-top: -32px;
  }

  .card#election {
    background: ${colorNeutralCardBackground};
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }

  #election-header {
    margin-bottom: 12px;
  }

  #election-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  #election-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  #election-info h4 {
    margin: 0;
    font-size: ${typographyStyles.subtitle1.fontSize};
    font-weight: ${typographyStyles.subtitle1.fontWeight};
    line-height: ${typographyStyles.subtitle1.lineHeight};
  }

  #election-info p {
    display: -webkit-box;
    margin: 0;
    font-size: ${typographyStyles.body2.fontSize};
    font-weight: ${typographyStyles.body2.fontWeight};
    line-height: ${typographyStyles.body2.lineHeight};
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  #election-content img {
    width: 33%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: ${smtcCornerImageInCardRest};
  }
`;
