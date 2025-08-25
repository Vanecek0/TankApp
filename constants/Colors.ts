export const Colors = {

  primary: "#B80019",
  secondary: "#198754",
  white: "#FFFFFF",
  transparent: "#FFFFFF00",

  text: {
    primary: "#171717",   // hlavní text na světlém pozadí
    primary_dark: "#EDEDED",    // text na tmavém pozadí
    secondary: "#909090", // méně výrazný text
    muted: "#AAAAAA",     // skrytý / hint text
    disabled: "#999999",  // neaktivní text/ikony
  },

  icon: {
    primary: "#171717",   // stejné jako text.primary
    disabled: "#999999",  // stejné jako text.disabled
  },

  background: {
    light: "#F2F2F2",
    dark: "#0D0D0D",
    surface: {
      light: "#FFFFFF",
      dark: "#232323",
    }
  },

  badge: {
    primary: "#B80019",
  },

  status: {
    success: "#198754",
    warning: "#F54505",
    error: "#B80019",
    neutral: "#FFFFFF",
    brand: "#B80019"
  }
};

export type ColorsKey = keyof typeof Colors;