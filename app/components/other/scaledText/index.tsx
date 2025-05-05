import { Colors } from '@/constants/Colors';
import { FontSizes } from '@/constants/FontSizes';
import { useTheme } from '@/theme/ThemeProvider';
import { Text, TextProps } from 'react-native';

export type FontSizeKey = keyof typeof FontSizes;

type ScaledTextProps = TextProps & {
  size: FontSizeKey;
  isThemed?: boolean;
};

export default function ScaledText({ size, isThemed = false, style, children, ...props }: ScaledTextProps) {
  const { isDark } = useTheme();
  const fontStyle = FontSizes[size];
  const themedColor = isThemed
    ? { color: isDark ? Colors.dark.text : Colors.light.text }
    : {};

  return (
    <Text
      style={[{ fontSize: fontStyle.size, lineHeight: fontStyle.lineHeight }, themedColor, style]}
      {...props}
    >
      {children}
    </Text>
  );
}