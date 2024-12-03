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

export const styles = css`
  :host {
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
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
    width: ${(x) => `${x.ews.viewportSize?.width - 1}px`};
    height: ${(x) => `${x.ews.viewportSize?.height - 1}px`};
    background: linear-gradient(180deg, #ffffff80 0%, white 100%),
      url('img/edge/newtab2/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
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
    max-width: 1024px;
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
  }

  .card#msn {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 336px;
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
    display: none;
  }
`;
