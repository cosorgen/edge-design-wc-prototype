import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundCtrlNeutralPrimaryRest,
  foregroundCtrlNeutralSecondaryRest,
  gapBetweenContentMedium,
  gapBetweenContentSmall,
  gapBetweenContentXsmall,
  paddingContentMedium,
  shadowFlyout,
  textGlobalBody3Fontsize,
  textGlobalBody3Lineheight,
  textGlobalCaption2Fontsize,
  textGlobalCaption2Lineheight,
} from '@edge-design/kumo-theme/tokens.js';
import { gapBetweenContentXxsmall } from '@edge-design/kumo-theme/tokens.js';
import { statusSuccessTintForeground } from '@edge-design/kumo-theme/tokens.js';
import { textGlobalBody2Fontsize } from '@edge-design/kumo-theme/tokens.js';
import { textStyleDefaultHeaderWeight } from '@edge-design/kumo-theme/tokens.js';
import { textGlobalBody2Lineheight } from '@edge-design/kumo-theme/tokens.js';
import { textGlobalCaption1Fontsize } from '@edge-design/kumo-theme/tokens.js';
import { textStyleDefaultRegularWeight } from '@edge-design/kumo-theme/tokens.js';
import { textGlobalCaption1Lineheight } from '@edge-design/kumo-theme/tokens.js';
import '@mai-ui/link/define.js';
import '@mai-ui/menu-list/define.js';
import '@mai-ui/menu-item/define.js';

const template = html<IdentityMenu>` <div id="top-row">
    <img id="avatar" src="./img/edge/profile_dog.png" alt="User Avatar" />
    <div>
      <div id="profile-name">Personal</div>
      <div id="profile-email">johnsmith@contoso.com</div>
      <div id="profile-status">
        <svg>
          <use href="./img/edge/icons.svg#checkmark-circle-16-regular"></use>
        </svg>
        <div>Sync is on</div>
      </div>
    </div>
    <mai-button id="settings" appearance="subtle" icon-only>
      <svg>
        <use href="./img/edge/icons.svg#settings-20-regular"></use>
      </svg>
    </mai-button>
  </div>
  <div id="wallet">
    <div id="header">
      <span>Wallet</span>
      <div id="actions">
        <mai-button appearance="subtle" size="small" icon-only>
          <svg>
            <use href="./img/edge/icons.svg#payment-20-regular"></use>
          </svg>
        </mai-button>
        <mai-button appearance="subtle" size="small" icon-only>
          <svg>
            <use href="./img/edge/icons.svg#key-20-regular"></use>
          </svg>
        </mai-button>
        <mai-button appearance="subtle" size="small" icon-only>
          <svg>
            <use href="./img/edge/icons.svg#person-note-20-regular"></use>
          </svg>
        </mai-button>
      </div>
    </div>
    <div class="wallet-row">
      <div id="start">
        <svg>
          <use href="./img/edge/icons.svg#reward-20-regular"></use>
        </svg>
      </div>
      <div id="end">
        <div id="title">Microsoft Rewards</div>
        <div id="content">
          <div>3,290 pts</div>
          <mai-link href="#" size="small">Redeem</mai-link>
        </div>
      </div>
    </div>
    <div class="wallet-row">
      <div id="start">
        <svg>
          <use href="./img/edge/icons.svg#tag-20-regular"></use>
        </svg>
      </div>
      <div id="end">
        <div id="title">Microsoft Cashback</div>
        <div id="content">
          <div>$30.56</div>
          <mai-link href="#" size="small">Get paid</mai-link>
        </div>
      </div>
    </div>
  </div>
  <div id="footer">
    <mai-menu-list>
      <mai-menu-item>
        <span slot="start">
          <img src="./img/edge/profile_guest.png" width="20" />
        </span>
        Work
        <span slot="end">johnsmith@contoso.com</span>

        <mai-menu-list slot="submenu">
          <mai-menu-item> Work profile </mai-menu-item>
        </mai-menu-list>
      </mai-menu-item>
      <mai-menu-item>
        <svg slot="start" width="20" height="20">
          <use href="./img/edge/icons.svg#person-switch-20-regular"></use>
        </svg>
        Other profiles
        <mai-menu-list slot="submenu">
          <mai-menu-item> Test profile </mai-menu-item>
        </mai-menu-list>
      </mai-menu-item>
    </mai-menu-list>
  </div>`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentMedium};
    padding: ${paddingContentMedium};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyout};
    color: ${foregroundCtrlNeutralPrimaryRest};
    overflow: hidden;
  }

  mai-button#settings {
    align-self: flex-start;
  }

  #top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentSmall};

    img {
      width: 52px;
      height: 52px;
      object-fit: cover;
      border-radius: 50%;
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: ${gapBetweenContentXxsmall};
    }
  }

  #profile-name {
    font-size: ${textGlobalBody2Fontsize};
    line-height: ${textGlobalBody2Lineheight};
    font-weight: ${textStyleDefaultHeaderWeight};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  #profile-email {
    font-size: ${textGlobalCaption1Fontsize};
    line-height: ${textGlobalCaption1Lineheight};
    font-weight: ${textStyleDefaultRegularWeight};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  #profile-status {
    display: flex;
    flex-direction: row;
    gap: ${gapBetweenContentXxsmall};
    color: ${statusSuccessTintForeground};
    font-size: ${textGlobalCaption1Fontsize};
    line-height: ${textGlobalCaption1Lineheight};
    font-weight: ${textStyleDefaultRegularWeight};

    svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  }

  #wallet {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentXxsmall};

    & > span {
      font-size: ${textGlobalBody3Fontsize};
      line-height: ${textGlobalBody3Lineheight};
      font-weight: ${textStyleDefaultHeaderWeight};
      color: ${foregroundCtrlNeutralPrimaryRest};
    }

    #header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .wallet-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXsmall};

    #start {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    #end {
      display: flex;
      flex-direction: column;
      width: 100%;

      #title {
        font-size: ${textGlobalCaption2Fontsize};
        line-height: ${textGlobalCaption2Lineheight};
        color: ${foregroundCtrlNeutralSecondaryRest};
      }

      #content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: ${gapBetweenContentXxsmall};
        font-size: ${textGlobalBody3Fontsize};
        line-height: ${textGlobalBody3Lineheight};
        font-weight: ${textStyleDefaultHeaderWeight};
        color: ${foregroundCtrlNeutralPrimaryRest};
      }
    }
  }

  #footer > mai-menu-list {
    padding: 0;
    box-shadow: none;
  }
`;

@customElement({ name: 'identity-flyout', template, styles })
export class IdentityMenu extends FASTElement {}
