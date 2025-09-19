import { Dimensions, PixelRatio } from 'react-native';

export const DEVICE_TYPES = {
  PHONE_SMALL: 'phone-small',
  PHONE_NORMAL: 'phone-normal',
  PHONE_LARGE: 'phone-large',
  TABLET: 'tablet',
  TABLET_LARGE: 'tablet-large',
} as const;

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 375;

export const getDeviceType = (): typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES] => {

  const shortest = Math.min(width, height);
  const adjustedWidth = shortest * PixelRatio.get();

  if (adjustedWidth < 1080) return 'phone-small';
  if (adjustedWidth < 1440) return 'phone-normal';
  if (adjustedWidth < 1600) return 'phone-large';
  if (adjustedWidth < 2560) return 'tablet';
  return 'tablet-large';
};

const SCALE_SIZE: Record<typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES], { min: number; max: number }> = {
  [DEVICE_TYPES.PHONE_SMALL]: { min: 0.75, max: 0.80 },
  [DEVICE_TYPES.PHONE_NORMAL]: { min: 0.80, max: 0.85 },
  [DEVICE_TYPES.PHONE_LARGE]: { min: 0.85, max: 0.9 },
  [DEVICE_TYPES.TABLET]: { min: 1.00, max: 1.25 },
  [DEVICE_TYPES.TABLET_LARGE]: { min: 1.5, max: 1.6 },
};

export const getScaleFactor = () => {
  const config = SCALE_SIZE[getDeviceType()];
  const scaleFactor = width / BASE_WIDTH;
  return Math.min(Math.max(scaleFactor, config.min), config.max);
};

console.log(getScaleFactor())

export const scaled = (value: number) => value * getScaleFactor();

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
  ps: (v: number) => ({
    paddingStart: scaled(v),
  }),
  pe: (v: number) => ({
    paddingEnd: scaled(v),
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
  borderTopLeftRadius: (v: number) => ({
    borderTopLeftRadius: scaled(v),
  }),
  borderTopRightRadius: (v: number) => ({
    borderTopRightRadius: scaled(v),
  }),
  borderTopRadius: (v: number) => ({
    ...spacing.borderTopLeftRadius(v),
    ...spacing.borderTopRightRadius(v),
  }),
  borderBottomLeftRadius: (v: number) => ({
    borderBottomLeftRadius: scaled(v),
  }),
  borderBottomRightRadius: (v: number) => ({
    borderBottomRightRadius: scaled(v),
  }),
  borderBottomRadius: (v: number) => ({
    ...spacing.borderBottomLeftRadius(v),
    ...spacing.borderBottomRightRadius(v),
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