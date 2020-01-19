import { Dimensions, PixelRatio, Platform } from 'react-native';
export const maxFontSizeMultiplier = 1.2;
// Setting default window with for handling SSR support
const windowWidth = Dimensions.get('window').width || 800;
const BASE_SCALE = windowWidth > 340 ? 1 : 0.75;
const BASE_UNIT = 16;
const BASE_EM_UNIT = BASE_SCALE * BASE_UNIT;
const FONT_SCALE = Math.min(PixelRatio.getFontScale(), maxFontSizeMultiplier);

export type ScaleOptions = {
  forFont?: boolean;
};

function nativeRem(unit: number, forFont: boolean): string {
  return `${unit * BASE_EM_UNIT * (forFont ? 1 : FONT_SCALE)}px`;
}

export function em(
  unit: number,
  { forFont = false }: ScaleOptions = {},
): string {
  if (Platform.OS === 'web') {
    return `${unit}em`;
  }

  return nativeRem(unit, forFont);
}

export function rem(
  unit: number,
  { forFont = false }: ScaleOptions = {},
): string {
  if (Platform.OS === 'web') {
    return `${unit}rem`;
  }

  return nativeRem(unit, forFont);
}

export function scaleUnitLess(
  unit: number,
  { forFont = false }: ScaleOptions = {},
): number {
  return unit * BASE_SCALE * (forFont ? 1 : FONT_SCALE);
}

export function removeListItem<T>(items: T[], index: number): T[] {
  return [...items.slice(0, index), ...items.slice(index + 1)];
}
