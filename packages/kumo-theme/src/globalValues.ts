export type SizeValues = {
  0: string;
  20: string;
  30: string;
  40: string;
  60: string;
  80: string;
  100: string;
  120: string;
  160: string;
  200: string;
  240: string;
  280: string;
  320: string;
  360: string;
  400: string;
  480: string;
  520: string;
  560: string;
  640: string;
};

export type CornerValues = {
  0: string;
  20: string;
  40: string;
  60: string;
  80: string;
  120: string;
  160: string;
  200: string;
  240: string;
  circular: string;
};

export type StrokeWidthValues = {
  0: string;
  5: string;
  10: string;
  15: string;
  20: string;
  30: string;
  40: string;
  60: string;
};

export type FontFamilyValues = {
  base: string;
  serif: string;
};

export type FontSizeValues = {
  100: string;
  200: string;
  300: string;
  400: string;
  450: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000: string;
};

export type LineHeightValues = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000: string;
};

export type FontWeightValues = {
  regular: string;
  medium: string;
  semibold: string;
};

export type ShadowValues = {
  shadowKeyX: string;
  shadowKeyY2: string;
  shadowKeyY4: string;
  shadowKeyY8: string;
  shadowKeyY16: string;
  shadowKeyY28: string;
  shadowKeyY64: string;
  shadowKeyBlur2: string;
  shadowKeyBlur4: string;
  shadowKeyBlur8: string;
  shadowKeyBlur16: string;
  shadowKeyBlur28: string;
  shadowKeyBlur64: string;
  shadowAmbientX: string;
  shadowAmbientY: string;
  shadowAmbientBlurLow: string;
  shadowAmbientBlurHigh: string;
};

export type NullValues = {
  nullString: string;
  nullNumber: number;
};

export const size: SizeValues = {
  0: '0px',
  20: '2px',
  30: '3px',
  40: '4px',
  60: '6px',
  80: '8px',
  100: '10px',
  120: '12px',
  160: '16px',
  200: '20px',
  240: '24px',
  280: '28px',
  320: '32px',
  360: '36px',
  400: '40px',
  480: '48px',
  520: '52px',
  560: '56px',
  640: '64px',
};

export const corner: CornerValues = {
  0: '0px',
  20: '2px',
  40: '4px',
  60: '6px',
  80: '8px',
  120: '12px',
  160: '16px',
  200: '20px',
  240: '24px',
  circular: '9999px',
};

export const strokeWidth: StrokeWidthValues = {
  0: '0px',
  5: '0.5px',
  10: '1px',
  15: '1.5px',
  20: '2px',
  30: '3px',
  40: '4px',
  60: '6px',
};

export const fontFamily: FontFamilyValues = {
  base: '"Segoe Sans", "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;',
  serif: '"Lora", serif',
};

export const fontSize: FontSizeValues = {
  100: '10px',
  200: '12px',
  300: '14px',
  400: '16px',
  450: '18px',
  500: '20px',
  600: '24px',
  700: '28px',
  800: '32px',
  900: '40px',
  1000: '68px',
};

export const lineHeight: LineHeightValues = {
  100: '14px',
  200: '16px',
  300: '20px',
  400: '24px',
  500: '28px',
  600: '32px',
  700: '36px',
  800: '48px',
  900: '52px',
  1000: '92px',
};

export const fontWeight: FontWeightValues = {
  regular: '400',
  medium: '500',
  semibold: '550',
};

export const shadow: ShadowValues = {
  shadowKeyX: '0px',
  shadowKeyY2: '0.5px',
  shadowKeyY4: '4px', // marked as remove
  shadowKeyY8: '4px', // marked as needs adjusting
  shadowKeyY16: '6px',
  shadowKeyY28: '28px', // marked as remove
  shadowKeyY64: '16px',
  shadowKeyBlur2: '4px',
  shadowKeyBlur4: '8px', // marked as remove
  shadowKeyBlur8: '8px', // marked as needs adjusting
  shadowKeyBlur16: '12px',
  shadowKeyBlur28: '56px', // marked as remove
  shadowKeyBlur64: '24px',
  shadowAmbientX: '0px',
  shadowAmbientY: '0px',
  shadowAmbientBlurLow: '4px',
  shadowAmbientBlurHigh: '8px',
};

export const nullValues: NullValues = {
  nullString: 'String value',
  nullNumber: 0,
};
