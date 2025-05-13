export const Colors = {
    primary: "#B80019",
    white: "#fff",
    inactive_icon: "#999",
    hidden_text: "#FF9BB0",
  
    dark: {
      background: "#0D0D0D",
      text: "#EDEDED",
      secondary_light: "#303030",
      secondary: "#232323"
    },
  
    light: {
      background: "#f2f2f2",
      text: "#171717",
      secondary: "#fff"
    },

    badge: {
      orange: "#F54505",
      red: "#B80019",
      green: "#198754",
    }
    
  };
  
  export type Theme = typeof Colors.light;
  export type ColorsKey = keyof typeof Colors;