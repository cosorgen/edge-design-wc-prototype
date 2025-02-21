import {
  customElement,
  html,
  css,
  FASTElement,
  attr,
} from '@microsoft/fast-element';
import '@phoenixui/web-components/text-input.js';
import '@phoenixui/web-components/button.js';
import {
  borderRadiusLayerDialog,
  colorNeutralForeground1,
  shadow28,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingVerticalM,
  spacingVerticalXS,
  typographyStyles,
  spacingVerticalXL,
} from '@phoenixui/themes';
import '../../../windows/controls/acrylic-material.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { inject } from '@microsoft/fast-element/di.js';

const template = html<SavePasswordOmniboxFlyout>`
  <acrylic-material></acrylic-material>
  <div id="content">
    <div class="title">Save your password?</div>
    <div class="input-group">
      <label for="favorite-name">Username</label>
      <phx-text-input value="test@test.com">
        <svg slot="end">
          <use href="./img/edge/icons.svg#down-chevron-20-regular" />
        </svg>
      </phx-text-input>
    </div>
    <div class="input-group">
      <label for="favorite-name">Password</label>
      <phx-text-input type="password" value="12341234"></phx-text-input>
    </div>
    <div class="footer">
      <div class="button-group">
        <phx-button @click="${(x) => x.closeFlyout()}"> Not now </phx-button>
        <phx-button appearance="primary" @click="${(x) => x.closeFlyout()}">
          Save
        </phx-button>
      </div>
    </div>
  </div>
`;

const styles = css`
  :host {
    display: block;
    position: relative;
    border-radius: ${borderRadiusLayerDialog};
    box-shadow: ${shadow28};
    color: ${colorNeutralForeground1};
    overflow: hidden;
  }

  #content {
    position: relative;
    min-width: 256px;
    min-height: 120px;
    padding: ${spacingHorizontalL};
  }

  .title {
    margin-bottom: ${spacingVerticalM};
    font-family: ${typographyStyles.subtitle2.fontFamily};
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalXS};
    margin-bottom: ${spacingVerticalM};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: ${spacingVerticalXL};
  }

  .button-group {
    display: flex;
    flex-direction: ${(x) => (x.ss.reversedCTA ? 'row-reverse' : 'row')};
    gap: ${spacingHorizontalM};
  }
`;

@customElement({
  name: 'save-password-omnibox-flyout',
  template,
  styles,
})
export class SavePasswordOmniboxFlyout extends FASTElement {
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;
  @attr({ mode: 'boolean' }) open = false;

  closeFlyout() {
    this.$emit('closemenu'); // Emit a close event
  }
}
