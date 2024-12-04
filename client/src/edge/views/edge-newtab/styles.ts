import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorNeutralCardBackground,
  colorNeutralCardBackgroundHover,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForegroundStaticInverted,
  colorNeutralStroke1,
  fontWeightRegular,
  shadow16,
  strokeWidthThin,
  typographyStyles,
  borderRadiusLarge,
  colorScrollbarForeground,
  colorBrandForeground1,
  colorNeutralForegroundHint,
  colorNeutralStroke2,
  colorStrokeFocus1,
  colorStrokeFocus2,
  strokeWidthThick,
  borderRadiusMedium,
  durationFast,
  curveDecelerateMax,
} from '@mai-ui/kumo-theme';

const smtcBackgroundCardOnImageRest = `var(--smtc-background-card-on-image-rest, ${colorNeutralCardBackground})`;
const smtcCornerComposerRest = `var(--smtc-corner-composer-rest, ${borderRadiusCircular})`;
const smtcStrokeComposerRest = `var(--smtc-stroke-composer-rest, ${colorNeutralStroke1})`;
const smtcShadowComposerRest = `var(--smtc-shadow-composer-rest, ${shadow16})`;
const smtcTextControlButtonFontFamily = `var(--smtc-text-control-button-font-family, ${typographyStyles.body1.fontFamily})`;
const smtcTextControlButtonFontSize = `var(--smtc-text-control-button-font-size, ${typographyStyles.body1.fontFamily})`;
const smtcTextControlButtonWeight = `var(--smtc-text-control-button-weight, ${typographyStyles.body1.fontWeight})`;
const smtcTextControlButtonLineHeight = `var(--smtc-text-control-button-line-height, ${typographyStyles.body1.lineHeight})`;
const smtcTextControlButtonColor = `var(--smtc-text-control-button-color, ${colorNeutralForeground2})`;
const smtcBackgroundCardOnImageHover = `var(--smtc-background-card-on-image-hover, ${colorNeutralCardBackgroundHover})`;
const smtcCornerCardRest = `var(--smtc-corner-card-rest, ${borderRadiusLarge})`;
const smtcCornerImageInCardRest = `var(--smtc-corner-image-in-card-rest, ${borderRadiusMedium})`;

export const styles = css`
  :host {
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scroll-timeline: --scrollbar-timeline y;
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
    gap: 104px;
    padding: 104px;
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

  #scrollbar {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 4px;
    height: calc(var(--viewport-height) - 4px);

    opacity: 0;
    transition: opacity 200ms 200ms;

    animation-name: scrollbar;
    animation-timing-function: linear;
    animation-timeline: --scrollbar-timeline;
  }

  :host(:hover) #scrollbar {
    opacity: 1;
  }

  #scrollbar > div {
    position: relative;
    width: 4px;
    height: var(--scrollbar-height);
    background: ${colorScrollbarForeground};
    border-radius: 2px;
    animation-name: scroller;
    animation-timing-function: linear;
    animation-timeline: --scrollbar-timeline;
  }

  #content-header {
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  #top-sites {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }

  #lets-talk {
    padding: 16px 24px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    background: ${smtcBackgroundCardOnImageRest};
    border-radius: ${smtcCornerComposerRest};
    border: ${strokeWidthThin} solid ${smtcStrokeComposerRest};
    box-shadow: ${smtcShadowComposerRest};
    cursor: pointer;
    font-family: ${smtcTextControlButtonFontFamily};
    font-size: ${smtcTextControlButtonFontSize};
    font-weight: ${smtcTextControlButtonWeight};
    line-height: ${smtcTextControlButtonLineHeight};
    color: ${smtcTextControlButtonColor};
  }

  #lets-talk:hover {
    background: ${smtcBackgroundCardOnImageHover};
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1298px;
  }

  .section-header {
    width: 100%;

    h2 {
      margin: 0;
      font-family: ${typographyStyles.title3.fontFamily};
      font-size: ${typographyStyles.title3.fontSize};
      font-weight: ${typographyStyles.title3.fontWeight};
      line-height: ${typographyStyles.title3.lineHeight};
      color: ${colorNeutralForeground1};
    }
  }

  .section-content#today {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;

    :nth-child(1) {
      grid-area: 1 / 1 / 3 / 2;
    }

    :nth-child(2) {
      grid-area: 1 / 2 / 3 / 3;
    }

    :nth-child(3) {
      grid-area: 1 / 3 / 3 / 4;
    }
  }

  .card {
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

    h3 {
      margin: 0;
      margin-bottom: 6px;
      font-size: ${typographyStyles.title3.fontSize};
      font-weight: ${fontWeightRegular};
      line-height: ${typographyStyles.title3.lineHeight};
    }

    p {
      margin: 0;
      margin-bottom: 12px;
      font-size: ${typographyStyles.caption1.fontSize};
      font-weight: ${typographyStyles.caption1.fontWeight};
      line-height: ${typographyStyles.caption1.lineHeight};
    }

    mai-button {
      width: fit-content;
    }
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
    border-radius: 20.087px;
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
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
  }

  #weather-today {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    overflow: hidden;
    margin-bottom: 32px;
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

  #weather-hourly-title {
    margin: 0;
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
    margin-bottom: 12px;
  }

  #weather-hourly {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  .weather-hour {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    padding: 20px 10px;
    border-radius: 10px;
  }

  .weather-hour img {
    width: 24px;
    height: 24px;
  }

  .weather-hour p {
    margin: 0;
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
  }

  .weather-hour h5 {
    margin: 0;
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
  }

  .weather-hour .humidity {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
  }

  .weather-hour .humidity svg {
    margin-top: 2px;
    width: 6px;
    height: 10px;
  }

  .weather-hour .humidity p {
    margin: 0;
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
  }

  .card#sports {
    background: linear-gradient(0deg, #2f554ce5 0%, #2f554ce5 100%),
      url('img/edge/newtab2/sports.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: ${colorNeutralForegroundStaticInverted};
  }

  #sports-header {
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
  }

  #sports-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    height: 100%;
  }

  .sports-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    font-size: ${typographyStyles.body2.fontSize};
    font-weight: ${typographyStyles.body2.fontWeight};
    line-height: ${typographyStyles.body2.lineHeight};
  }

  .sports-team img {
    width: 40px;
    height: 40px;
  }

  #sports-score {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  #sports-score h1 {
    margin: 0;
    font-size: ${typographyStyles.largeTitle.fontSize};
    font-weight: ${typographyStyles.largeTitle.fontWeight};
    line-height: ${typographyStyles.largeTitle.lineHeight};
  }

  #sports-time {
    background: #c50f1f;
    padding: 12px;
    padding-block: 4px 6px;
    border-radius: ${borderRadiusCircular};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
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
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
  }

  #election-info p {
    margin: 0;
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
  }

  #election-content img {
    width: 33%;
    aspect-ratio: 1 / 1;
    border-radius: ${smtcCornerImageInCardRest};
  }

  .section-header h3 {
    margin: 0;
    margin-top: 4px;
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
  }

  .section-content#trending {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      '. . . .'
      '. . . .';
    gap: 20px;
  }

  .article {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: ${smtcCornerCardRest};
    cursor: pointer;
    transition: transform ${durationFast} ${curveDecelerateMax};
  }

  .article:hover {
    transform: scale(1.02);
  }

  .article > img {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: ${smtcCornerImageInCardRest};
  }

  .article-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
  }

  .article-info h4 {
    margin: 0;
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
  }

  .article-byline {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    color: ${colorNeutralForegroundHint};
  }

  .article-byline p {
    margin: 0;
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
  }
`;
