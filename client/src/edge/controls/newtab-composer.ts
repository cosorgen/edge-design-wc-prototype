import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorNeutralForegroundHint,
  spacingHorizontalS,
} from '@phoenixui/themes/phoenix-tokens.js';
import {
  colorNeutralCardBackground,
  colorNeutralForeground2,
  colorNeutralStroke1,
  shadow16,
  strokeWidthThin,
  colorNeutralBackground1,
  shadow2,
  spacingVerticalMNudge,
  spacingHorizontalXXL,
} from '@phoenixui/themes/phoenix-tokens.js';
import { typographyStyles } from '@phoenixui/themes';

const template = html`
  <input
    type="text"
    placeholder="Search Microsoft and the web"
    @keydown="${(x, c) => x.handleKeydown(c.event)}"
  />
  <div id="end">
    <slot name="end">
      <mai-button appearance="subtle" size="large" icon-only>
        <svg>
          <use x="2" y="2" href="img/edge/icons.svg#search-20-regular" />
        </svg>
      </mai-button>
    </slot>
  </div>
`;

const smtcBackgroundCardOnImageRest = `var(--smtc-background-card-on-image-rest, ${colorNeutralCardBackground})`;
const smtcCornerComposerRest = `var(--smtc-corner-composer-rest, ${borderRadiusCircular})`;
const smtcStrokeComposerRest = `var(--smtc-stroke-composer-rest, ${colorNeutralStroke1})`;
const smtcShadowComposerRest = `var(--smtc-shadow-composer-rest, ${shadow16})`;
const smtcTextComposerFontFamily = `var(--smtc-text-composer-font-family, ${typographyStyles.body2.fontFamily})`;
const smtcTextComposerFontSize = `var(--smtc-text-composer-font-size, ${typographyStyles.body2.fontSize})`;
const smtcTextComposerWeight = `var(--smtc-text-composer-weight, ${typographyStyles.body2.fontWeight})`;
const smtcTextComposerLineHeight = `var(--smtc-text-composer-line-height, ${typographyStyles.body2.lineHeight})`;
const smtcTextComposerColor = `var(--smtc-text-composer-color, ${colorNeutralForeground2})`;
const smtcBackgroundComposerInputRest = `var(--smtc-background-composer-input-rest, ${colorNeutralBackground1})`;
const smtcShadowComposerInputRest = `var(--smtc-shadow-composer-input-rest, ${shadow2})`;

const styles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalS};
    padding: ${spacingHorizontalS};
    background: ${smtcBackgroundCardOnImageRest};
    border: ${strokeWidthThin} solid ${smtcStrokeComposerRest};
    border-radius: ${smtcCornerComposerRest};
    box-shadow: ${smtcShadowComposerRest};
  }

  input {
    flex: 1;
    box-sizing: border-box;
    height: 48px;
    min-width: 582px;
    border: none;
    background: ${smtcBackgroundComposerInputRest};
    border-radius: ${borderRadiusCircular};
    box-shadow: ${smtcShadowComposerInputRest};
    padding: ${spacingVerticalMNudge} ${spacingHorizontalXXL};

    font-family: ${smtcTextComposerFontFamily};
    font-size: ${smtcTextComposerFontSize};
    font-weight: ${smtcTextComposerWeight};
    line-height: ${smtcTextComposerLineHeight};
    color: ${smtcTextComposerColor};
  }

  input:focus {
    outline: none;
  }

  input:empty::placeholder {
    color: ${colorNeutralForegroundHint};
  }
`;

@customElement({ name: 'newtab-composer', template, styles })
export class NewtabComposer extends FASTElement {
  focus() {
    const input = this.shadowRoot?.querySelector('input');
    if (input) input.focus();
  }

  handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement)?.value || '';
      this.$emit('submit', { url: value });
    }

    return true; // allow event to continue bubbling
  }
}
