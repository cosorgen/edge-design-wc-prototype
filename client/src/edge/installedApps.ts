import { ViewTemplate, html } from '@microsoft/fast-element';
import './views/extensions-hub.js';
import './views/copilot-sidepane.js';

export type ToolbarApp = {
  type: 'flyout' | 'sidebar';
  template?: ViewTemplate;
  iconId?: string;
};

export default {
  Favorites: {
    type: 'flyout',
    template: html`<div class="flyout-menu">Favorites</div>`,
    iconId: 'star-20-regular',
  },
  History: {
    type: 'flyout',
    template: html`<div class="flyout-menu">History</div>`,
    iconId: 'history-20-regular',
  },
  Shopping: {
    type: 'flyout',
    template: html`<div class="flyout-menu">Shopping</div>`,
    iconId: 'tag-20-regular',
  },
  Downloads: {
    type: 'flyout',
    template: html`<div class="flyout-menu">Downloads</div>`,
    iconId: 'arrow-download-20-regular',
  },
  Extensions: {
    type: 'flyout',
    template: html`<extensions-hub></extensions-hub>`,
    iconId: 'puzzle-piece-20-regular',
  },
  'Browser Essentials': {
    type: 'flyout',
    template: html`<div class="flyout-menu">Browser Essentials</div>`,
    iconId: 'heart-pulse-20-regular',
  },
  Passwords: {
    type: 'flyout',
    template: html`<div class="flyout-menu">Passwords</div>`,
    iconId: 'key-20-regular',
  },
  Search: {
    type: 'sidebar',
    template: html`<div>Search</div>`,
  },
  Grammarly: {
    type: 'flyout',
    template: html`<div class="flyout-menu">Grammarly</div>`,
  },
  AdBlocker: {
    type: 'flyout',
    template: html`<div class="flyout-menu">AdBlocker</div>`,
  },
  Tools: {
    type: 'sidebar',
    template: html`<div>Tools</div>`,
  },
  Copilot: {
    type: 'sidebar',
    template: html`<copilot-sidepane></copilot-sidepane>`,
  },
} as Record<string, ToolbarApp>;
