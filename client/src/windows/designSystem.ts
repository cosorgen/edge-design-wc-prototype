import { DesignToken } from '@microsoft/fast-foundation';
import { FASTElement } from '@microsoft/fast-element';
import { setThemeFor as FUISetThemeFor } from '@fluentui/web-components';
import { webDarkTheme, webLightTheme } from '@phoenixui/themes';
import { OSTheme } from '../services/windowsService.js';

export const micaBackgroundColor = DesignToken.create<string>(
  'micaBackgroundColor',
);
export const micaBackdropFilter =
  DesignToken.create<string>('micaBackdropFilter');
export const micaBackgroundBlendMode = DesignToken.create<string>(
  'micaBackgroundBlendMode',
);

export function setThemeFor(element: FASTElement, theme: OSTheme) {
  FUISetThemeFor(element, theme === 'dark' ? webDarkTheme : webLightTheme);

  if (theme === 'dark') {
    micaBackgroundColor.setValueFor(element, 'rgba(32, 32, 32, 0.7)');
    micaBackdropFilter.setValueFor(element, 'blur(120px) saturate(150%)');
    micaBackgroundBlendMode.setValueFor(element, 'luminosity');
  } else {
    micaBackgroundColor.setValueFor(element, 'rgba(243, 243, 243, 0.7)');
    micaBackdropFilter.setValueFor(element, 'blur(120px) saturate(150%)');
    micaBackgroundBlendMode.setValueFor(element, 'luminosity');
  }

  const curStyle = element.getAttribute('style');
  element.setAttribute(
    'style',
    `
      ${curStyle}
      --borderRadiusSmall: 4px;
      --borderRadiusMedium: 8px;
      --borderRadiusLarge: 16px;
    `,
  );
}
