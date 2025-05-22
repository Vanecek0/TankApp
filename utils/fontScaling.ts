import { PixelRatio } from 'react-native';
import getScaleFactor, { getDeviceType } from './SizeScaling';

export const getFontSize = (size: number): number => {
    const deviceType = getDeviceType();
    const clampedScaleFactor = getScaleFactor();
    let newSize = size * clampedScaleFactor;

    if (deviceType === 'tablet') {
        newSize *= 1.1; 
    }

    return Math.round(PixelRatio.roundToNearestPixel(newSize)) / PixelRatio.getFontScale();
};

export default getFontSize;