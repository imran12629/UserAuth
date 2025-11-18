import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

const widthScale = SCREEN_WIDTH / DESIGN_WIDTH;
const heightScale = SCREEN_HEIGHT / DESIGN_HEIGHT;

export const scale = (size: number) => widthScale * size;
export const verticalScale = (size: number) => heightScale * size;
export const moderateScale = (size: number, factor = 0.5) => 
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) => 
  size + (verticalScale(size) - size) * factor;

export const scaleFont = (size: number) => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;
export const isSmallDevice = SCREEN_WIDTH < 375;

export const normalizePixels = (size: number) => {
  const scaledSize = size * widthScale;
  return PixelRatio.roundToNearestPixel(scaledSize);
};
export const wp = (percent: string | number): number => {
  const ratio = typeof percent === 'string' ? parseFloat(percent) / 100 : percent / 100;
  return SCREEN_WIDTH * ratio;
};
export const hp = (percent: string | number): number => {
  const ratio = typeof percent === 'string' ? parseFloat(percent) / 100 : percent / 100;
  return SCREEN_HEIGHT * ratio;
};
