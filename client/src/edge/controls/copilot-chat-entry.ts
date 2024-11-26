import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
  observable,
  ViewTemplate,
} from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorBrandForegroundLink,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  colorNeutralForegroundHint,
  curveDecelerateMax,
  durationNormal,
  durationUltraSlow,
  fontFamilyMonospace,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingVerticalM,
  spacingVerticalXS,
  spacingVerticalXXS,
  typographyStyles,
  smtcBackgroundControlBrandRest,
  smtcBackgroundMessageBubble,
  smtcForegroundMessageBubble,
  smtcCornerMessageBubble,
  smtcPaddingBlockMessageBubble,
  smtcPaddingInlineMessageBubble,
} from '@mai-ui/copilot-theme';
import '@mai-ui/button/define.js';
import showdown from 'showdown';
import dompurify from 'dompurify';
import moment from 'moment';

const template = html`<div id="message">
    ${(x) => {
      const converter = new showdown.Converter();
      return new ViewTemplate(
        dompurify.sanitize(converter.makeHtml(x.message)),
      );
    }}
  </div>
  <div id="actions">
    <span id="timestamp">${(x) => moment(x.time).fromNow()}</span>
    <mai-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#thumb-like-20-regular"></use>
      </svg>
    </mai-button>
    <mai-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#thumb-dislike-20-regular"></use>
      </svg>
    </mai-button>
  </div>
  <div id="loading"></div>`;

const styles = css`
  :host {
    --text-transition-duration: 2s;

    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalXXS};
    align-items: center;
  }

  #message {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalM};
    width: fit-content;

    font-family: ${typographyStyles.body2.fontFamily};
    font-size: ${typographyStyles.body2.fontSize};
    line-height: ${typographyStyles.body2.lineHeight};
    font-weight: ${typographyStyles.body2.fontWeight};
    color: ${colorNeutralForeground1};
    text-wrap: pretty;
  }

  :host(:not([system])) #message {
    padding: ${smtcPaddingBlockMessageBubble} ${smtcPaddingInlineMessageBubble};
    border-radius: ${smtcCornerMessageBubble};
    background: ${smtcBackgroundMessageBubble};
    color: ${smtcForegroundMessageBubble};
    align-self: flex-end;
    text-align: end;
    max-width: 80%;

    transform: translateY(0px);
    opacity: 1;
    transition:
      transform ${durationUltraSlow} ${curveDecelerateMax},
      opacity ${durationUltraSlow} ${curveDecelerateMax};
  }

  :host([system]) #message {
    background: transparent;
    align-self: flex-start;
    padding: 0;
    text-align: start;

    mask: linear-gradient(165deg, black, black 50%, transparent 75%);
    mask-position: 200% 200%;
    mask-size: 200% 200%;
    mask-repeat: no-repeat;
    transition: mask-position var(--text-transition-duration);
  }

  :host([system]:not([pending])) #message {
    mask-position: 0 0;
  }

  #actions {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalXS};
    align-items: center;

    font-family: ${typographyStyles.caption1.fontFamily};
    font-size: ${typographyStyles.caption1.fontSize};
    line-height: ${typographyStyles.caption1.lineHeight};
    font-weight: ${typographyStyles.caption1.fontWeight};
    color: ${colorNeutralForegroundHint};

    opacity: 0;
    transition: opacity ${durationNormal};

    mai-button {
      color: ${colorNeutralForegroundHint};
    }
  }

  :host(:hover:is([system]):not([pending])) #actions {
    opacity: 1;
  }

  :host([pending]) #message {
    transform: translateY(24px);
    opacity: 0;
  }

  #loading {
    display: none;
    width: 64px;
    height: 64px;
    background-color: ${smtcBackgroundControlBrandRest};
    mask: url(img/edge/copilotLoading.gif);
    mask-size: cover;
    mask-repeat: no-repeat;
    mask-position: center;
    margin-block-end: ${spacingVerticalM};

    opacity: 1;
    transition: opacity ${durationUltraSlow} ${curveDecelerateMax} 250ms;
  }

  :host([pending]) #loading {
    display: block;
  }

  :host([pending]) #actions {
    display: none;
  }

  @starting-style {
    :host([system]:not([pending])) #message {
      mask-position: 200% 200%;
    }

    :host(:not([system])) #message {
      transform: translateY(40px);
      opacity: 0;
    }

    #loading {
      opacity: 0;
    }
  }

  #message * {
    padding: 0;
    margin: 0;
    width: fit-content;
  }

  #message h1 {
    font-family: ${typographyStyles.title1.fontFamily};
    font-size: ${typographyStyles.title1.fontSize};
    line-height: ${typographyStyles.title1.lineHeight};
    font-weight: ${typographyStyles.title1.fontWeight};
  }

  #message h2 {
    font-family: ${typographyStyles.title2.fontFamily};
    font-size: ${typographyStyles.title2.fontSize};
    line-height: ${typographyStyles.title2.lineHeight};
    font-weight: ${typographyStyles.title2.fontWeight};
  }

  #message h3 {
    font-family: ${typographyStyles.title3.fontFamily};
    font-size: ${typographyStyles.title3.fontSize};
    line-height: ${typographyStyles.title3.lineHeight};
    font-weight: ${typographyStyles.title3.fontWeight};
  }

  #message h4 {
    font-family: ${typographyStyles.subtitle1.fontFamily};
    font-size: ${typographyStyles.subtitle1.fontSize};
    line-height: ${typographyStyles.subtitle1.lineHeight};
    font-weight: ${typographyStyles.subtitle1.fontWeight};
  }

  #message h5 {
    font-family: ${typographyStyles.subtitle1.fontFamily};
    font-size: ${typographyStyles.subtitle1.fontSize};
    line-height: ${typographyStyles.subtitle1.lineHeight};
    font-weight: ${typographyStyles.subtitle1.fontWeight};
  }

  #message h6 {
    font-family: ${typographyStyles.subtitle1.fontFamily};
    font-size: ${typographyStyles.subtitle1.fontSize};
    line-height: ${typographyStyles.subtitle1.lineHeight};
    font-weight: ${typographyStyles.subtitle1.fontWeight};
  }

  #message ul,
  #message ol {
    padding-inline-start: ${spacingHorizontalXL};

    li {
      margin-block: ${spacingVerticalXS};
    }
  }

  #message strong {
    font-family: ${typographyStyles.subtitle2.fontFamily};
    font-size: ${typographyStyles.subtitle2.fontSize};
    line-height: ${typographyStyles.subtitle2.lineHeight};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
  }

  #message a {
    color: ${colorBrandForegroundLink};
    text-decoration: underline;
  }

  #message code {
    font-family: ${fontFamilyMonospace};
    font-size: ${typographyStyles.body2.fontSize};
    line-height: ${typographyStyles.body2.lineHeight};
    font-weight: ${typographyStyles.body2.fontWeight};
    color: ${colorNeutralForeground1};

    background: ${colorLayerBackgroundDialog};
    padding: ${spacingVerticalXS} ${spacingHorizontalS};
    border-radius: ${borderRadiusMedium};
  }
`;

@customElement({ name: 'copilot-chat-entry', template, styles })
export class CopilotChatEntry extends FASTElement {
  @attr({ mode: 'boolean' }) system = false;
  @attr({ mode: 'boolean' }) inline = false;
  @attr({ mode: 'boolean' }) pending = false;
  @observable timestamp = 0;
  @observable message = '';
}
