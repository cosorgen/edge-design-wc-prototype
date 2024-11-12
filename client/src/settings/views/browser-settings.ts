import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { typographyStyles } from '@phoenixui/themes';
import '../controls/setting-entry.js';
import '../controls/setting-select.js';
import '@phoenixui/web-components/text-input.js';
import { TabService } from '#servicestabService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';

const template = html<BrowserSettings>`
  <h2>Browser</h2>
  <setting-entry>
    <label for="favorites-bar">Show favorites bar</label>
    <select
      is="setting-select"
      id="favorites-bar"
      @change="${(x) => x.updateShowFavoritesBar()}"
      value="${(x) => x.ss.showFavoritesBar}"
    >
      <option
        value="always"
        ?selected="${(x) => x.ss.showFavoritesBar === 'always'}"
      >
        Always
      </option>
      <option
        value="never"
        ?selected="${(x) => x.ss.showFavoritesBar === 'never'}"
      >
        Never
      </option>
      <option
        value="newtab"
        ?selected="${(x) => x.ss.showFavoritesBar === 'newtab'}"
      >
        On new tab
      </option>
    </select>
  </setting-entry>
  <setting-entry>
    <label for="shopping-trigger">Shopping trigger URL</label>
    <phx-text-input
      id="shopping-trigger"
      type="text"
      value="${(x) => x.ts.shoppingTriggerURL}"
      @blur="${(x) => x.updateShoppingTrigger()}"
    >
    </phx-text-input>
  </setting-entry>
`;

const styles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  h2 {
    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: 32px;
    margin: 0;
    user-select: none;
  }
`;

@customElement({ name: 'browser-settings', template, styles })
export class BrowserSettings extends FASTElement {
  @attr({ mode: 'boolean' }) hidden = false;
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;
  @inject(TabService) ts!: TabService;

  updateShowFavoritesBar() {
    this.ss.setShowFavoritesBar(
      ((this.shadowRoot?.querySelector('#favorites-bar') as HTMLSelectElement)
        ?.value as 'always' | 'never' | 'newtab') || 'never',
    );
  }

  updateShoppingTrigger() {
    const newTrigger = (
      this.shadowRoot?.querySelector('#shopping-trigger') as HTMLInputElement
    ).value;
    if (newTrigger && newTrigger !== '') {
      this.ts.updateShoppingTriggerURL(newTrigger);
    }
  }
}
