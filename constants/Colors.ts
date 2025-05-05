export const Colors = {
    primary: "#B80019",
    white: "#fff",
    inactive_icon: "#999",
  
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
    
    get: (scheme: 'light' | 'dark' | null | undefined) => {
      if (scheme === 'dark') return Colors.dark;
      return Colors.light;
    }
  };
  
  export type Theme = typeof Colors.light;