export const useTheme = jest.fn(() => ({ isDark: false }));
const ThemeProvider = jest.fn(({ children }: any) => <>{children}</>);

export default ThemeProvider;