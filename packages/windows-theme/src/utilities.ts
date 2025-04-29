export type WindowsUtilityTokens = {
  colorScrollbarForeground: string;
  colorScrollbarForegroundHover: string;
  colorScrollbarForegroundPressed: string;
  colorScrollbarOverlay: string;
  colorBackgroundOverlay: string;
  desktopBackground: string;
};

export const lightThemeUtilityTokens: WindowsUtilityTokens = {
  colorScrollbarForeground: '#00000072',
  colorScrollbarForegroundHover: '#0000009b',
  colorScrollbarForegroundPressed: '#0000009e',
  colorScrollbarOverlay: '#00000080',
  colorBackgroundOverlay: '#00000066',
  desktopBackground: 'url(img/windows/desktopLight.jpg)',
};

export const darkThemeUtilityTokens: WindowsUtilityTokens = {
  colorScrollbarForeground: '#ffffff8b',
  colorScrollbarForegroundHover: '#ffffff8b',
  colorScrollbarForegroundPressed: '#ffffff8b',
  colorScrollbarOverlay: '#ffffff99',
  colorBackgroundOverlay: '#00000080',
  desktopBackground: 'url(img/windows/desktopDark.jpg)',
};

export const hcThemeUtilityTokens: WindowsUtilityTokens = {
  colorScrollbarForeground: '#000000',
  colorScrollbarForegroundHover: '#ffffff',
  colorScrollbarForegroundPressed: '#ffffff',
  colorScrollbarOverlay: '#00000080',
  colorBackgroundOverlay: '#00000080',
  desktopBackground: 'url(img/windows/desktopDark.jpg)',
};
