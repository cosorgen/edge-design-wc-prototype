import {
  FASTElement,
  customElement,
  css,
  html,
  attr,
} from '@microsoft/fast-element';
import {
  gapBetweenContentXSmall,
  paddingContentXSmall,
  ctrlListCornerRest,
  backgroundCtrlSubtleRest,
  textRampItemBodyFontSize,
  textStyleDefaultRegularWeight,
  textStyleDefaultRegularFontFamily,
  foregroundCtrlNeutralSecondaryRest,
} from '@mai-ui/design-tokens/tokens.js';
import '@mai-ui/button/define.js';

const labels = {
  usb: {
    title: 'Device name',
    description: 'USB device',
  },
};

const template = html<SiteInfoPermissionDevice>`
  <svg>
    <use href="img/edge/icons.svg#${(x) => x.deviceIcon}-20-regular" />
  </svg>
  <div>
    <div>
      ${(x) => x.deviceName || labels[x.type as keyof typeof labels].title}
    </div>
    <div>${(x) => labels[x.type as keyof typeof labels].description}</div>
  </div>
  <mai-button
    appearance="subtle"
    icon-only
    @click="${(x) => x.$emit('togglepermission', { type: x.type, id: x.id })}"
  >
    <svg>
      <use href="img/edge/icons.svg#dismiss-20-regular" />
    </svg>
  </mai-button>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: flex-start; /* Needed so button doesn't stretch to full height */
    gap: ${gapBetweenContentXSmall};
    padding: ${paddingContentXSmall};
    border-radius: ${ctrlListCornerRest};
    background: ${backgroundCtrlSubtleRest};

    div {
      flex: 1;
      font-family: ${textStyleDefaultRegularFontFamily};
      font-size: ${textRampItemBodyFontSize};
      font-weight: ${textStyleDefaultRegularWeight};

      &:last-child {
        color: ${foregroundCtrlNeutralSecondaryRest};
      }
    }

    svg {
      width: 20px;
      height: 20px;
    }

    mai-button {
      height: auto;
    }
  }
`;

@customElement({ name: 'site-info-permission-device', template, styles })
export default class SiteInfoPermissionDevice extends FASTElement {
  @attr type = 'usb';
  @attr deviceName = '';
  @attr deviceIcon = '';
}
