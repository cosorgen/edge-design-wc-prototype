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
} from '@mai-ui/design-tokens/tokens.js';
import '@mai-ui/switch/define.js';

const labels = {
  camera: 'Camera',
  microphone: 'Microphone',
  popup: 'Pop-ups and redirects',
  location: 'Location',
};

const icons = {
  camera: {
    active: 'video-20-regular',
    inactive: 'video-off-20-regular',
  },
  microphone: {
    active: 'mic-20-regular',
    inactive: 'mic-off-20-regular',
  },
  popup: {
    active: 'open-20-regular',
    inactive: 'open-off-20-regular',
  },
  location: {
    active: 'location-20-regular',
    inactive: 'location-off-20-regular',
  },
};

const template = html<SiteInfoPermissionItem>`
  <svg>
    <use
      href="img/edge/icons.svg#${(x) =>
        icons[x.type as keyof typeof icons][x.checked ? 'active' : 'inactive']}"
    />
  </svg>
  <div>${(x) => labels[x.type as keyof typeof labels]}</div>
  <mai-switch
    checked="${(x) => x.checked}"
    @click="${(x) => x.$emit('togglepermission', { type: x.type })}"
  ></mai-switch>
`;

const styles = css`
  :host {
    all: unset;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXSmall};
    padding: ${paddingContentXSmall};
    border-radius: ${ctrlListCornerRest};
    background: ${backgroundCtrlSubtleRest};

    div {
      flex: 1;
      font-family: ${textStyleDefaultRegularFontFamily};
      font-size: ${textRampItemBodyFontSize};
      font-weight: ${textStyleDefaultRegularWeight};
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

@customElement({ name: 'site-info-permission-item', template, styles })
export default class SiteInfoPermissionItem extends FASTElement {
  @attr({ mode: 'boolean' }) checked = false;
  @attr type: 'camera' | 'microphone' | 'popup' | 'location' = 'camera';
}
