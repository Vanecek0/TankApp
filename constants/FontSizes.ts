import { getFontSize } from "@/utils/fontScaling";

export const FontSizes = {
    xs: {
        size: getFontSize(16 * 0.75),
        lineHeight: (16 * 1) 
    },
    sm: {
        size: getFontSize(16 * 0.875),
        lineHeight: (16 * 1.25) 
    },
    base: {
        size: getFontSize(16 * 1),
        lineHeight: (16 * 1.5) 
    },
    lg: {
        size: getFontSize(16 * 1.125),
        lineHeight: (16 * 1.75) 
    },
    xl: {
        size: getFontSize(16 * 1.25),
        lineHeight: (16 * 1.75)
    },
    "2xl": {
        size: getFontSize(16 * 1.5),
        lineHeight: (16 * 2)
    },
    "3xl": {
        size: getFontSize(16 * 1.85),
        lineHeight: (16 * 2.25)
    },
    "4xl": {
        size: getFontSize(16 * 2.25),
        lineHeight: (16 * 2.5) 
    },
    "5xl": {
        size: getFontSize(16 * 3),
        lineHeight: (16 * 1) 
    },
    "6xl": {
        size: getFontSize(16 * 3.75),
        lineHeight: (16 * 1) 
    },
    "7xl": {
        size: getFontSize(16 * 4.5),
        lineHeight: (16 * 1) 
    },
    "8xl": {
        size: getFontSize(16 * 6),
        lineHeight: (16 * 1) 
    },
    "9xl": {
        size: getFontSize(16 * 8),
        lineHeight: (16 * 1) 
    },
};