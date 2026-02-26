import { ThemeColors as Colors } from "@/constants/Colors";
import { FontSizes } from "@/utils/fontScaling";
import { useTheme } from "@/theme/ThemeProvider";
import getScaleFactor from "@/utils/SizeScaling";
import { StyleProp, Text, TextProps, TextStyle, View } from "react-native";

export type FontSizeKey = keyof typeof FontSizes;

type ScaledTextProps = TextProps & {
  size: FontSizeKey;
  style?: StyleProp<TextStyle>;
  color?: string;
  className?: string;
  isThemed?: boolean;
};

export default function ScaledText({
  size,
  style,
  color,
  className,
  isThemed = false,
  children,
  ...props
}: ScaledTextProps) {
  const { isDark } = useTheme();
  const fontStyle = FontSizes[size];
  const themedColor = isThemed
    ? { color: isDark ? Colors.text.primary_dark : Colors.text.primary }
    : color != null
    ? { color: color }
    : {};

  return (
    <Text
      style={[
        {
          fontSize: fontStyle.size,
          lineHeight: fontStyle.lineHeight * getScaleFactor(),
        },
        themedColor,
        style,
      ]}
      className={className}
      {...props}
    >
      {children}
    </Text>
  );
}
