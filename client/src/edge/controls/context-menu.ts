import { FASTElement, customElement, css, html } from '@microsoft/fast-element';
import './menu-item.js';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundContentNeutralPrimary,
  foregroundContentNeutralSecondary,
  gapBetweenContentXsmall,
  shadowFlyout,
  paddingContentXsmall,
  paddingContentXxsmall,
} from '@edge-design/kumo-theme/tokens.js';

const template = html<ContextMenu>`
  <div id="menu-items">
    <slot></slot>
  </div>
`;

const styles = css`
  :host {
    min-width: 96px;
    max-width: 512px;
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXsmall};
    padding: ${paddingContentXsmall};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyout};
    overflow: hidden;
    color: ${foregroundContentNeutralPrimary};
  }

  #menu-items {
    display: flex;
    flex-direction: column;
  }

  .hint {
    color: ${foregroundContentNeutralSecondary};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  svg[slot='end'] {
    margin-inline-end: calc(0px - ${paddingContentXxsmall});
  }

  mai-divider {
    margin-block: ${paddingContentXxsmall};
  }
`;

@customElement({ name: 'context-menu', template, styles })
export default class ContextMenu extends FASTElement {}
