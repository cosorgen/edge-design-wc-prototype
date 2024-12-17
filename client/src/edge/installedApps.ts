import { ViewTemplate, html } from '@microsoft/fast-element';
import './views/hub-flyouts/extensions-hub-flyout.js';
import './views/hub-flyouts/favorites-hub-flyout.js';
import './views/hub-flyouts/downloads-hub-flyout.js';
import './views/hub-flyouts/history-hub-flyout.js';
import './views/hub-flyouts/shopping-hub-flyout.js';
import './views/hub-flyouts/browser-essentials-flyout.js';
import './views/hub-flyouts/passwords-flyout.js';
import './views/hub-flyouts/grammarly-flyout.js';
import './views/hub-flyouts/adblocker-flyout.js';
import './views/sidepanes/tools-sidepane.js';
import './views/sidepanes/search-sidepane.js';
import './views/sidepanes/copilot-sidepane.js';

export type ToolbarApp = {
  type: 'flyout' | 'sidepane';
  template?: ViewTemplate;
  iconId?: string;
};

export default {
  Favorites: {
    type: 'flyout',
    template: html`<favorites-hub-flyout></favorites-hub-flyout>`,
    iconId: 'star-20-regular',
  },
  History: {
    type: 'flyout',
    template: html`<history-hub-flyout></history-hub-flyout>`,
    iconId: 'history-20-regular',
  },
  Shopping: {
    type: 'flyout',
    template: html`<shopping-hub-flyout></shopping-hub-flyout>`,
    iconId: 'tag-20-regular',
  },
  Downloads: {
    type: 'flyout',
    template: html`<downloads-hub-flyout></downloads-hub-flyout>`,
    iconId: 'arrow-download-20-regular',
  },
  Extensions: {
    type: 'flyout',
    template: html`<extensions-hub-flyout></extensions-hub-flyout>`,
    iconId: 'puzzle-piece-20-regular',
  },
  'Browser Essentials': {
    type: 'flyout',
    template: html`<browser-essentials-flyout></browser-essentials-flyout>`,
    iconId: 'heart-pulse-20-regular',
  },
  'Microsoft Password Manager': {
    type: 'flyout',
    template: html`<passwords-flyout></passwords-flyout>`,
    iconId: 'key-20-regular',
  },
  Grammarly: {
    type: 'flyout',
    template: html`<grammarly-flyout></grammarly-flyout>`,
  },
  AdBlocker: {
    type: 'flyout',
    template: html`<adblocker-flyout></adblocker-flyout>`,
  },
  Search: {
    type: 'sidepane',
    template: html`<search-sidepane></search-sidepane>`,
  },
  Tools: {
    type: 'sidepane',
    template: html`<tools-sidepane></tools-sidepane>`,
  },
  Copilot: {
    type: 'sidepane',
    template: html`<copilot-sidepane></copilot-sidepane>`,
  },
} as Record<string, ToolbarApp>;
