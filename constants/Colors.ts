export const Colors = {
    primary: "#F50537",
    white: "#fff",
  
    dark: {
      background: "#140f0a",
      text: "#EDEDED",
      card: "#fff",
    },
  
    light: {
      background: "#fff",
      text: "#171717",
      card: "#000",
    },
    
    get: (scheme: 'light' | 'dark' | null | undefined) => {
      if (scheme === 'dark') return Colors.dark;
      return Colors.light;
    }
  };
  
  export type Theme = typeof Colors.light;