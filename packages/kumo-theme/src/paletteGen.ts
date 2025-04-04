import {
  argbFromHex,
  Hct,
  hexFromArgb,
  sanitizeDegreesDouble,
  TonalPalette,
} from '@material/material-color-utilities';

export type SchemeVariant = 'tonal' | 'vibrant' | 'expressive' | 'neutral';

export type Transform = {
  hueRotation: number;
  chroma: number;
  huesToRotations?: Record<number, number>;
  huesToChroma?: Record<number, number>;
};

export type Config = {
  primary: Transform;
  secondary: Transform;
  tertiary: Transform;
  neutral: Transform;
  neutralVariant: Transform;
};

export type Palette = {
  primary: TonalPalette;
  secondary: TonalPalette;
  tertiary: TonalPalette;
  error: TonalPalette;
  neutral: TonalPalette;
  neutralVariant: TonalPalette;
};

export type PaletteTones = {
  primary: { [tone in number]: string };
  secondary: { [tone in number]: string };
  tertiary: { [tone in number]: string };
  error: { [tone in number]: string };
  neutral: { [tone in number]: string };
  neutralVariant: { [tone in number]: string };
};

export type ChromePalette = {
  tonal: PaletteTones;
  vibrant: PaletteTones;
  expressive: PaletteTones;
  neutral: PaletteTones;
};

function Transform(
  hueRotation = 0,
  chroma = 0,
  huesToRotations?: Record<number, number>,
  huesToChroma?: Record<number, number>,
): Transform {
  return {
    hueRotation,
    chroma,
    huesToRotations,
    huesToChroma,
  };
}

function Chroma(chroma: number): Transform {
  return {
    hueRotation: 0.0,
    chroma,
  };
}

// Returns the key that's closest to input in the object.
function GetClosestKey(input: number, obj: Record<number, number>): number {
  const keys = Object.keys(obj)
    .map(Number)
    .sort((a, b) => a - b);
  return keys.reduce((prev, curr) => {
    return Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev;
  });
}

// Returns the hue angle for `sourceColor` modified by the closest match in
// `huesToRotations`.
function GetRotatedHue(
  sourceHue: number,
  huesToRotations: Record<number, number>,
): number {
  if (Object.keys(huesToRotations).length === 0) {
    console.error('huesToRotations is empty');
  }
  if (sourceHue < 0.0 || sourceHue > 360.0) {
    console.error('sourceHue is out of range');
  }

  const closestHue = GetClosestKey(sourceHue, huesToRotations);
  const rotation = huesToRotations[closestHue];
  return sanitizeDegreesDouble(sourceHue + rotation);
}

// Returns the chroma value from `hues_to_chroma` given a `source_hue`. If the
// `source_hue` is out of range, the first entry in `hues_to_chroma` is
// returned.
function GetAdjustedChroma(
  sourceHue: number,
  huesToChroma: Record<number, number>,
): number {
  if (Object.keys(huesToChroma).length === 0) {
    console.error('huesToChroma is empty');
  }
  if (sourceHue < 0.0 || sourceHue > 360.0) {
    console.error('sourceHue is out of range');
  }

  const closestHue = GetClosestKey(sourceHue, huesToChroma);
  return huesToChroma[closestHue];
}

// Returns a `TonalPalette` constructed from `hue` transformed by `transform`.
function MakePallete(hue: number, transform: Transform): TonalPalette {
  //CHECK_LE(hue, 360.0); // IDK what is
  let { chroma } = transform;
  if (transform.huesToChroma) {
    chroma = GetAdjustedChroma(hue, transform.huesToChroma);
  }
  if (transform.huesToRotations) {
    hue = GetRotatedHue(hue, transform.huesToRotations);
  } else {
    hue = sanitizeDegreesDouble(hue + transform.hueRotation);
  }

  return TonalPalette.fromHueAndChroma(hue, chroma);
}

function FromConfig(seedColor: string, config: Config): Palette {
  const srcHTC = Hct.fromInt(argbFromHex(seedColor));
  const hue = srcHTC.hue;
  return {
    primary: MakePallete(hue, config.primary),
    secondary: MakePallete(hue, config.secondary),
    tertiary: MakePallete(hue, config.tertiary),
    error: TonalPalette.fromHueAndChroma(25, 84),
    neutral: MakePallete(hue, config.neutral),
    neutralVariant: MakePallete(hue, config.neutralVariant),
  };
}

export function GeneratePalette(
  seedColor: string,
  variant: SchemeVariant,
): Palette {
  let config = {} as Config;
  switch (variant) {
    case 'tonal':
      config = {
        primary: Chroma(40.0),
        secondary: Chroma(16.0),
        tertiary: Transform(60.0, 24.0),
        neutral: Chroma(6.0),
        neutralVariant: Chroma(8.0),
      };
      break;
    case 'vibrant': {
      const secondaryHuesToRotations = {
        0: 18,
        41: 15,
        61: 10,
        101: 12,
        131: 15,
        181: 18,
        251: 15,
        301: 12,
        360: 12,
      };
      const terciaryHuesToRotations = {
        0: 35,
        41: 30,
        61: 25,
        101: 30,
        131: 35,
        181: 18,
        251: 30,
        301: 25,
        360: 25,
      };
      config = {
        primary: Chroma(200.0),
        secondary: Transform(0.0, 24.0, secondaryHuesToRotations),
        tertiary: Transform(0.0, 32.0, terciaryHuesToRotations),
        neutral: Chroma(8.0),
        neutralVariant: Chroma(12.0),
      };
      break;
    }
    case 'neutral': {
      const huesToChroma = {
        0: 12,
        260: 12,
        315: 20,
        360: 12,
      };
      config = {
        primary: Transform(0, 0, undefined, huesToChroma),
        secondary: Chroma(8.0),
        tertiary: Chroma(16.0),
        neutral: Chroma(2.0),
        neutralVariant: Chroma(2.0),
      };
      break;
    }
    case 'expressive': {
      const secondaryHuesToRotations = {
        0: 45,
        21: 95,
        51: 45,
        121: 20,
        151: 45,
        191: 90,
        271: 45,
        321: 45,
        360: 45,
      };
      const terciaryHuesToRotations = {
        0: 120,
        21: 120,
        51: 20,
        121: 45,
        151: 20,
        191: 15,
        271: 20,
        321: 120,
        360: 120,
      };
      config = {
        primary: Transform(-90, 40.0),
        secondary: Transform(0, 24, secondaryHuesToRotations),
        tertiary: Transform(0, 32, terciaryHuesToRotations),
        neutral: Chroma(8),
        neutralVariant: Chroma(12),
      };
      break;
    }
    default:
      console.error('Invalid variant');
  }

  return FromConfig(seedColor, config);
}

function GeneratePaletteTones(palette: Palette): PaletteTones {
  const primary = {} as { [tone in number]: string };
  for (let i = 0; i <= 100; i++) {
    primary[i as keyof typeof primary] = hexFromArgb(palette.primary.tone(i));
  }
  const secondary = {} as { [tone in number]: string };
  for (let i = 0; i <= 100; i++) {
    secondary[i as keyof typeof secondary] = hexFromArgb(
      palette.secondary.tone(i),
    );
  }
  const tertiary = {} as { [tone in number]: string };
  for (let i = 0; i <= 100; i++) {
    tertiary[i as keyof typeof tertiary] = hexFromArgb(
      palette.tertiary.tone(i),
    );
  }
  const error = {} as { [tone in number]: string };
  for (let i = 0; i <= 100; i++) {
    error[i as keyof typeof error] = hexFromArgb(palette.error.tone(i));
  }
  const neutral = {} as { [tone in number]: string };
  for (let i = 0; i <= 100; i++) {
    neutral[i as keyof typeof neutral] = hexFromArgb(palette.neutral.tone(i));
  }
  const neutralVariant = {} as { [tone in number]: string };
  for (let i = 0; i <= 100; i++) {
    neutralVariant[i as keyof typeof neutralVariant] = hexFromArgb(
      palette.neutralVariant.tone(i),
    );
  }
  return { primary, secondary, tertiary, error, neutral, neutralVariant };
}

export function GenerateAllPalettes(seedColor: string): ChromePalette {
  return {
    tonal: GeneratePaletteTones(GeneratePalette(seedColor, 'tonal')),
    vibrant: GeneratePaletteTones(GeneratePalette(seedColor, 'vibrant')),
    expressive: GeneratePaletteTones(GeneratePalette(seedColor, 'expressive')),
    neutral: GeneratePaletteTones(GeneratePalette(seedColor, 'neutral')),
  };
}
