import { customElement } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorBrandStroke,
  colorLayerBackgroundDialog,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStroke2,
  colorNeutralStrokeAccessible,
  spacingHorizontalS,
  spacingVerticalXS,
  strokeWidthThick,
  strokeWidthThin,
  typographyStyles,
} from '@phoenixui/themes';

const styles = /* css */ `
  [is="setting-select"] {
    padding: ${spacingVerticalXS} ${spacingHorizontalS};
    border-radius: ${borderRadiusMedium};
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
    background-color: ${colorNeutralBackground1};

    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
    color: ${colorNeutralForeground1};
  }

  [is="setting-select"]:focus,
  [is="setting-select"]:focus-visible {
    border-bottom: ${strokeWidthThick} solid ${colorBrandStroke};
    outline: none;
  }

  [is="setting-select"] option {
    background-color: ${colorLayerBackgroundDialog};
    color: ${colorNeutralForeground1};
  }
`;

@customElement({
  name: 'setting-select',
  elementOptions: { extends: 'select' },
})
export class SettingSelect extends HTMLSelectElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Apply the styles to the parent document
    const style = document.createElement('style');
    style.textContent = styles;
    this.parentElement?.appendChild(style);
  }
}
