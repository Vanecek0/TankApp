export const Colors = {
  primary: "#B80019",
  secondary: "#198754",
  white: "#FFFFFF",
  black: "#000000",
  transparent: "#FFFFFF00",

  palette: {
    primary: { light: "#171717", dark: "#EDEDED" },
    secondary: { light: "#909090", dark: "#6f6f6f" },
    muted: { light: "#AAAAAA", dark: "#555555" },
    disabled: { light: "#999999", dark: "#666666" },
  },
};

export const ThemeColors = {
  base: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    white: Colors.white,
    black: Colors.black,
    transparent: Colors.transparent
  },

  text: {
    primary: Colors.palette.primary.light,
    primary_dark: Colors.palette.primary.dark,
    secondary: Colors.palette.secondary.light,
    secondary_dark: Colors.palette.secondary.dark,
    muted: Colors.palette.muted.light,
    muted_dark: Colors.palette.muted.dark,
    disabled: Colors.palette.disabled.light,
    disabled_dark: Colors.palette.disabled.dark,
  },

  icon: {
    primary: Colors.palette.primary.light,
    primary_dark: Colors.palette.primary.dark,
    disabled: Colors.palette.disabled.light,
    disabled_dark: Colors.palette.disabled.dark,
  },

  border: {
    primary: Colors.palette.primary.light,
    primary_dark: Colors.palette.primary.dark,
    secondary: Colors.palette.secondary.light,
    secondary_dark: Colors.palette.secondary.dark,
    muted: Colors.palette.muted.light,
    muted_dark: Colors.palette.muted.dark,
    disabled: Colors.palette.disabled.light,
    disabled_dark: Colors.palette.disabled.dark,
  },

  background: {
    light: "#efefef",
    dark: "#101010",
    surface: {
      light: "#FFFFFF",
      dark: "#232323",
    }
  },

  badge: {
    primary: Colors.primary,
  },

  status: {
    success: Colors.secondary,
    warning: "#F54505",
    error: Colors.primary,
    neutral: Colors.white,
    brand: Colors.primary,
  }
};