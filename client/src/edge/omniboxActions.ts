import { html, ViewTemplate } from '@microsoft/fast-element';
import './controls/omnibox-action-flyout.js';
import './controls/shopping-button.ts';
import './controls/flyout-menu.js';
import './controls/shopping-flyout.js';
import './views/add-favorites-flyout.js';
import { colorBrandForeground1 } from '@edge-design/phoenix-theme';

export const overflowItems = {
  'limit-cookies': {
    title: 'Limit third-party cookies',
    iconId: 'eye-off-20-regular',
  },
  favorite: {
    title: 'Add favorite',
    iconId: 'star-add-20-regular',
    iconId2: 'star-20-filled',
  },
  shopping: { title: 'Shopping', iconId: 'shopping-20-regular' },
  'read-aloud': { title: 'Read aloud', iconId: 'read-aloud-20-regular' },
  install: { title: 'Install app', iconId: 'apps-add-in-20-regular' },
  share: { title: 'Share', iconId: 'share-20-regular' },
} as Record<string, { title: string; iconId: string; iconId2?: string }>;

export default {
  favorite: html` <omnibox-action-flyout id="favorite" slot="actions">
    <svg slot="trigger-content">
      <use
        href="img/edge/icons.svg#${(x) =>
          x.pageIsFavorite()
            ? overflowItems.favorite.iconId2
            : overflowItems.favorite.iconId}"
        style="${(x) =>
          x.pageIsFavorite() ? `color: ${colorBrandForeground1};` : ''}"
      />
    </svg>
    <add-favorites-flyout></add-favorites-flyout>
  </omnibox-action-flyout>`,
  shopping: html`<flyout-menu slot="actions">
    <shopping-button
      slot="trigger"
      @click="${(x, c) => c.event.stopPropagation()}"
    ></shopping-button>
    <shopping-flyout></shopping-flyout>
  </flyout-menu>`,
  'read-aloud': html`<omnibox-action-flyout id="read-aloud" slot="actions">
    <svg slot="trigger-content">
      <use href="img/edge/icons.svg#${overflowItems['read-aloud'].iconId}" />
    </svg>
    <div class="flyout-menu">${overflowItems['read-aloud'].title}</div>
  </omnibox-action-flyout>`,
  'limit-cookies': html`<omnibox-action-flyout
    id="limit-cookies"
    slot="actions"
  >
    <svg slot="trigger-content">
      <use href="img/edge/icons.svg#${overflowItems['limit-cookies'].iconId}" />
    </svg>
    <div class="flyout-menu">${overflowItems['limit-cookies'].title}</div>
  </omnibox-action-flyout>`,
  install: html`<omnibox-action-flyout id="install" slot="actions">
    <svg slot="trigger-content">
      <use href="img/edge/icons.svg#${overflowItems.install.iconId}" />
    </svg>
    <div class="flyout-menu">${overflowItems.install.title}</div>
  </omnibox-action-flyout>`,
  share: html`<omnibox-action-flyout id="install" slot="actions">
    <svg slot="trigger-content">
      <use href="img/edge/icons.svg#${overflowItems.share.iconId}" />
    </svg>
    <div class="flyout-menu">${overflowItems.share.title}</div>
  </omnibox-action-flyout>`,
} as Record<string, ViewTemplate>;
