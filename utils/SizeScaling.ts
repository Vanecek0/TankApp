import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SCALE = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH;
const BASE_WIDTH = 375;

const scaleSize = {
  phone: {
    small: { min: 0.8, max: 1.0 },
    medium: { min: 0.8, max: 0.9 },
    large: { min: 1.0, max: 1.2 }
  },
  tablet: {
    small: { min: 1.3, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.0, max: 1.5 }
  }
};

export const getDeviceType = (): 'phone' | 'tablet' => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return 'tablet';
  } else if (pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)) {
    return 'tablet';
  } else {
    return 'phone';
  }
};

const getScreenSizeCategory = (): 'small' | 'medium' | 'large' => {
  if (SCALE < 350) return 'small';
  if (SCALE > 500) return 'large';
  return 'medium';
};

export const getScaleFactor = () => {
  const deviceType = getDeviceType();
  const screenCategory = getScreenSizeCategory();
  const config = scaleSize[deviceType][screenCategory];
  const scaleFactor = SCALE / BASE_WIDTH;
  const clampedScaleFactor = Math.min(Math.max(scaleFactor, config.min), config.max);

  return clampedScaleFactor;
};

export const scaled = (value: number) => value * getScaleFactor()

export const spacing = {
  m: (v: number) => ({ margin: scaled(v) }),
  mt: (v: number) => ({ marginTop: scaled(v) }),
  mb: (v: number) => ({ marginBottom: scaled(v) }),
  me: (v: number) => ({ marginEnd: scaled(v) }),
  ms: (v: number) => ({ marginStart: scaled(v) }),
  mx: (v: number) => ({
    marginLeft: scaled(v),
    marginRight: scaled(v),
  }),
  my: (v: number) => ({
    marginTop: scaled(v),
    marginBottom: scaled(v),
  }),
  p: (v: number) => ({
    padding: scaled(v),
  }),
  px: (v: number) => ({
    paddingLeft: scaled(v),
    paddingRight: scaled(v),
  }),
  py: (v: number) => ({
    paddingTop: scaled(v),
    paddingBottom: scaled(v),
  }),
  pb: (v: number) => ({
    paddingBottom: scaled(v),
  }),
  pt: (v: number) => ({
    paddingTop: scaled(v),
  }),
  gap: (v: number) => ({
    gap: scaled(v),
  }),
  width: (v: number) => ({
    width: scaled(v),
  }),
  height: (v: number) => ({
    height: scaled(v),
  }),
  maxHeight: (v: number) => ({
    maxHeight: scaled(v),
  }),
  top: (v: number) => ({
    top: scaled(v),
  }),
  bottom: (v: number) => ({
    bottom: scaled(v),
  }),
  right: (v: number) => ({
    right: scaled(v),
  }),
  left: (v: number) => ({
    left: scaled(v),
  }),
  borderRadius: (v: number) => ({
    borderRadius: scaled(v),
  }),
  borderTopRadius: (v: number) => ({
    borderTopLeftRadius: scaled(v),
    borderTopRightRadius: scaled(v),
  }),
  borderBottomRadius: (v: number) => ({
    borderBottomLeftRadius: scaled(v),
    borderBottomRightRadius: scaled(v),
  }),
  borderWidth: (v: number) => ({
    borderWidth: scaled(v),
  }),
  borderTopWidth: (v: number) => ({
    borderTopWidth: scaled(v),
  }),
  borderBottomWidth: (v: number) => ({
    borderBottomWidth: scaled(v),
  })
}


export default getScaleFactor;