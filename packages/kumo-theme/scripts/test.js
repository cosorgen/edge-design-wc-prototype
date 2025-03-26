/* global console */

// Have to import them individually because of the way the package is built
import * as accordionTokens from '@mai-ui/design-tokens/accordion.js';
import * as accordionItemTokens from '@mai-ui/design-tokens/accordion-item.js';
import * as avatarTokens from '@mai-ui/design-tokens/avatar.js';
import * as badgeTokens from '@mai-ui/design-tokens/badge.js';
import * as buttonTokens from '@mai-ui/design-tokens/button.js';
import * as buyingOptionsTokens from '@mai-ui/design-tokens/buying-options.js';
import * as buyingOptionsBaseTokens from '@mai-ui/design-tokens/buying-options-base.js';
import * as buyingOptionsFilterTokens from '@mai-ui/design-tokens/buying-options-filter.js';
import * as buyingOptionsFilterGroupTokens from '@mai-ui/design-tokens/buying-options-filter-group.js';
import * as buyingOptionsRetailerListTokens from '@mai-ui/design-tokens/buying-options-retailer-list.js';
import * as cardTokens from '@mai-ui/design-tokens/card.js';
import * as checkboxTokens from '@mai-ui/design-tokens/checkbox.js';
import * as composerTokens from '@mai-ui/design-tokens/composer.js';
import * as composerButtonTokens from '@mai-ui/design-tokens/composer-button.js';
import * as composerInputTokens from '@mai-ui/design-tokens/composer-input.js';
import * as couponTokens from '@mai-ui/design-tokens/coupon.js';
import * as dialogTokens from '@mai-ui/design-tokens/dialog.js';
import * as dialogBodyTokens from '@mai-ui/design-tokens/dialog-body.js';
import * as dividerTokens from '@mai-ui/design-tokens/divider.js';
import * as drawerTokens from '@mai-ui/design-tokens/drawer.js';
import * as drawerBodyTokens from '@mai-ui/design-tokens/drawer-body.js';
import * as dropdownTokens from '@mai-ui/design-tokens/dropdown.js';
import * as fieldTokens from '@mai-ui/design-tokens/field.js';
import * as filterTokens from '@mai-ui/design-tokens/filter.js';
import * as filterItemTokens from '@mai-ui/design-tokens/filter-item.js';
import * as infoLabelTokens from '@mai-ui/design-tokens/info-label.js';
import * as linkTokens from '@mai-ui/design-tokens/link.js';
import * as listboxTokens from '@mai-ui/design-tokens/listbox.js';
import * as menuTokens from '@mai-ui/design-tokens/menu.js';
import * as menuItemTokens from '@mai-ui/design-tokens/menu-item.js';
import * as menuListTokens from '@mai-ui/design-tokens/menu-list.js';
import * as messageBarTokens from '@mai-ui/design-tokens/message-bar.js';
import * as metadataItemTokens from '@mai-ui/design-tokens/metadata-item.js';
import * as notificationTokens from '@mai-ui/design-tokens/notification.js';
import * as optionTokens from '@mai-ui/design-tokens/option.js';
import * as priceTokens from '@mai-ui/design-tokens/price.js';
import * as priceActivityTokens from '@mai-ui/design-tokens/price-activity.js';
import * as priceHistoryTokens from '@mai-ui/design-tokens/price-history.js';
import * as progressBarTokens from '@mai-ui/design-tokens/progress-bar.js';
import * as radioTokens from '@mai-ui/design-tokens/radio.js';
import * as radioGroupTokens from '@mai-ui/design-tokens/radio-group.js';
import * as ratingBarTokens from '@mai-ui/design-tokens/rating-bar.js';
import * as ratingDisplayTokens from '@mai-ui/design-tokens/rating-display.js';
import * as ratingHeaderTokens from '@mai-ui/design-tokens/rating-header.js';
import * as ratingProgressTokens from '@mai-ui/design-tokens/rating-progress.js';
import * as retailerItemTokens from '@mai-ui/design-tokens/retailer-item.js';
import * as reviewTokens from '@mai-ui/design-tokens/review.js';
import * as sliderTokens from '@mai-ui/design-tokens/slider.js';
import * as spinnerTokens from '@mai-ui/design-tokens/spinner.js';
import * as swatchesTokens from '@mai-ui/design-tokens/swatches.js';
import * as switchTokens from '@mai-ui/design-tokens/switch.js';
import * as tabTokens from '@mai-ui/design-tokens/tab.js';
import * as tablistTokens from '@mai-ui/design-tokens/tablist.js';
import * as textInputTokens from '@mai-ui/design-tokens/text-input.js';
import * as textareaTokens from '@mai-ui/design-tokens/textarea.js';
import * as tooltipTokens from '@mai-ui/design-tokens/tooltip.js';
import * as treeItemTokens from '@mai-ui/design-tokens/tree-item.js';
import { tokens as tokensFromEdge } from '../dist/esm/index.js';

const tokensFromKumo = {
  ...accordionTokens,
  ...accordionItemTokens,
  ...avatarTokens,
  ...badgeTokens,
  ...buttonTokens,
  ...buyingOptionsTokens,
  ...buyingOptionsBaseTokens,
  ...buyingOptionsFilterTokens,
  ...buyingOptionsFilterGroupTokens,
  ...buyingOptionsRetailerListTokens,
  ...cardTokens,
  ...checkboxTokens,
  ...composerTokens,
  ...composerButtonTokens,
  ...composerInputTokens,
  ...couponTokens,
  ...dialogTokens,
  ...dialogBodyTokens,
  ...dividerTokens,
  ...drawerTokens,
  ...drawerBodyTokens,
  ...dropdownTokens,
  ...fieldTokens,
  ...filterTokens,
  ...filterItemTokens,
  ...infoLabelTokens,
  ...linkTokens,
  ...listboxTokens,
  ...menuTokens,
  ...menuItemTokens,
  ...menuListTokens,
  ...messageBarTokens,
  ...metadataItemTokens,
  ...notificationTokens,
  ...optionTokens,
  ...priceTokens,
  ...priceActivityTokens,
  ...priceHistoryTokens,
  ...progressBarTokens,
  ...radioTokens,
  ...radioGroupTokens,
  ...ratingBarTokens,
  ...ratingDisplayTokens,
  ...ratingHeaderTokens,
  ...ratingProgressTokens,
  ...retailerItemTokens,
  ...reviewTokens,
  ...sliderTokens,
  ...spinnerTokens,
  ...swatchesTokens,
  ...switchTokens,
  ...tabTokens,
  ...tablistTokens,
  ...textInputTokens,
  ...textareaTokens,
  ...tooltipTokens,
  ...treeItemTokens,
};

function getVarsFromFallbackChain(css) {
  const entries = css.split(',');
  const vars = [];
  for (const entry of entries) {
    const cleaned = entry.replace(/var\(/g, '').replace(/\)/g, '').trim();
    // Filter out any hard coded values
    if (cleaned.startsWith('--')) {
      vars.push(cleaned);
    }
  }
  return vars;
}

let missingTokens = 0;
for (const [key, value] of Object.entries(tokensFromKumo)) {
  // Test if any tokens are missing in this package that are in @mai-ui/design-tokens
  const edgeToken = tokensFromEdge[key];
  if (!edgeToken) {
    console.error('Missing token from Kumo:', key);
    missingTokens++;
  } else {
    // Test if Edge css variable is in the chain for Kumo token
    const rawEdgeVariables = getVarsFromFallbackChain(edgeToken);
    const kumoRawVariables = getVarsFromFallbackChain(value);
    for (const rawEdgeVariable of rawEdgeVariables) {
      if (!kumoRawVariables.includes(rawEdgeVariable)) {
        // console.error(
        //   'Missing css variable from Kumo token:\n  ',
        //   key,
        //   '=',
        //   value,
        //   'missing',
        //   rawEdgeVariable,
        // );
      }
    }
  }
}

console.log('Missing tokens:', missingTokens);
