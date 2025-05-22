import { Colors } from '@/constants/Colors';
import { FontSizes } from '@/constants/FontSizes';
import { useTheme } from '@/theme/ThemeProvider';
import getScaleFactor from '@/utils/SizeScaling';
import { Text, TextProps } from 'react-native';

export type FontSizeKey = keyof typeof FontSizes;

type ScaledTextProps = TextProps & {
  size: FontSizeKey;
  color?: string;
  isThemed?: boolean;
};

export default function ScaledText({ size, isThemed = false, color, style, children, ...props }: ScaledTextProps) {
  const { isDark } = useTheme();
  const fontStyle = FontSizes[size];
  const themedColor = isThemed
    ? { color: isDark ? Colors.dark.text : Colors.light.text }
    : color != null ? { color: color} : {};

  return (
    <Text
      style={[{ fontSize: fontStyle.size, lineHeight: fontStyle.lineHeight*getScaleFactor() }, themedColor, style]}
      {...props}
    >
      {children}
    </Text>
  );
}